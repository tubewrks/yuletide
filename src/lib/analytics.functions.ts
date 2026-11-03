import { createClient } from "@supabase/supabase-js";
import { createServerFn } from "@tanstack/react-start";
import type { Database } from "@/integrations/supabase/types";

const EVENT_TYPES = ["plan_submitted", "plan_generated", "gumroad_click"] as const;
export type SiteEventType = (typeof EVENT_TYPES)[number];

const DAILY_WINDOW_DAYS = 14;

export type DashboardStats = {
  totals: Record<SiteEventType, number>;
  daily: {
    day: string;
    plan_submitted: number;
    plan_generated: number;
    gumroad_click: number;
  }[];
};

export const trackEvent = createServerFn({ method: "POST" })
  .inputValidator((input: { type: string }) => input)
  .handler(async ({ data }) => {
    const type = data?.type;
    if (
      typeof type !== "string" ||
      !(EVENT_TYPES as readonly string[]).includes(type)
    ) {
      return { ok: false };
    }

    const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
    const supabasePublic = createClient<Database>(
      process.env["SUPABASE_URL"]!,
      key,
      {
        auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
        global: {
          fetch: (input, init) => {
            const headers = new Headers(init?.headers);
            if (
              key.startsWith("sb_") &&
              headers.get("Authorization") === `Bearer ${key}`
            ) {
              headers.delete("Authorization");
            }
            headers.set("apikey", key);
            return fetch(input, { ...init, headers });
          },
        },
      },
    );

    const { error } = await supabasePublic
      .from("site_events")
      .insert({ event_type: type });
    if (error) {
      console.error("trackEvent insert failed:", error.message);
      return { ok: false };
    }
    return { ok: true };
  });

export async function track(type: SiteEventType) {
  try {
    await trackEvent({ data: { type } });
  } catch {
    // Tracking must never interrupt the visitor's flow.
  }
}

export const getDashboardStats = createServerFn({ method: "POST" })
  .inputValidator((input: { passcode: string }) => {
    if (typeof input?.passcode !== "string" || input.passcode.length === 0) {
      throw new Error("Enter the passcode to open the dashboard.");
    }
    return input;
  })
  .handler(async ({ data }) => {
    const passcode = process.env["DASHBOARD_PASSCODE"];
    if (!passcode || data.passcode !== passcode) {
      throw new Error("That passcode isn't right. Please try again.");
    }

    const { supabaseAdmin } = await import(
      "@/integrations/supabase/client.server"
    );

    const totals: Record<SiteEventType, number> = {
      plan_submitted: 0,
      plan_generated: 0,
      gumroad_click: 0,
    };
    for (const type of EVENT_TYPES) {
      const { count, error } = await supabaseAdmin
        .from("site_events")
        .select("id", { count: "exact", head: true })
        .eq("event_type", type);
      if (error) {
        throw new Error("Couldn't load the stats. Please try again.");
      }
      totals[type] = count ?? 0;
    }

    const since = new Date();
    since.setUTCDate(since.getUTCDate() - (DAILY_WINDOW_DAYS - 1));
    since.setUTCHours(0, 0, 0, 0);

    const { data: rows, error: rowsError } = await supabaseAdmin
      .from("site_events")
      .select("event_type, created_at")
      .gte("created_at", since.toISOString());
    if (rowsError) {
      throw new Error("Couldn't load the stats. Please try again.");
    }

    const dayKeys: string[] = [];
    for (let i = 0; i < DAILY_WINDOW_DAYS; i += 1) {
      const day = new Date(since);
      day.setUTCDate(since.getUTCDate() + i);
      dayKeys.push(day.toISOString().slice(0, 10));
    }
    const daily = new Map(
      dayKeys.map((day) => [
        day,
        { day, plan_submitted: 0, plan_generated: 0, gumroad_click: 0 },
      ]),
    );
    for (const row of rows ?? []) {
      const day = String(row.created_at).slice(0, 10);
      const bucket = daily.get(day);
      const type = row.event_type as SiteEventType;
      if (bucket && (EVENT_TYPES as readonly string[]).includes(type)) {
        bucket[type] += 1;
      }
    }

    return { totals, daily: dayKeys.map((day) => daily.get(day)!) } as DashboardStats;
  });

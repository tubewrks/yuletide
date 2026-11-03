import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  getDashboardStats,
  type DashboardStats,
} from "@/lib/analytics.functions";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Owner dashboard — The Calm Christmas Planner" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DashboardPage,
});

const CARDS: {
  key: keyof DashboardStats["totals"];
  label: string;
  hint: string;
  color: string;
}[] = [
  {
    key: "gumroad_click",
    label: "Gumroad clicks",
    hint: "Taps on any buy button",
    color: "text-berry",
  },
  {
    key: "plan_submitted",
    label: "Plans requested",
    hint: "\"Describe your Christmas\" form submissions",
    color: "text-evergreen",
  },
  {
    key: "plan_generated",
    label: "Plans created",
    hint: "Personal plans the AI finished",
    color: "text-gold-deep",
  },
];

function DashboardPage() {
  const [passcode, setPasscode] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "open" | "error">(
    "idle",
  );
  const [error, setError] = useState("");
  const [stats, setStats] = useState<DashboardStats | null>(null);

  async function unlock(event: React.FormEvent) {
    event.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const result = await getDashboardStats({ data: { passcode } });
      setStats(result);
      setStatus("open");
    } catch (caught) {
      setError(
        caught instanceof Error && caught.message
          ? caught.message
          : "Something went wrong. Please try again.",
      );
      setStatus("error");
    }
  }

  const maxDaily = stats
    ? Math.max(
        1,
        ...stats.daily.map(
          (day) => day.gumroad_click + day.plan_submitted + day.plan_generated,
        ),
      )
    : 1;

  return (
    <main className="flex min-h-screen items-start justify-center bg-background px-4 py-16 font-body text-foreground">
      <div className="w-full max-w-2xl">
        {status !== "open" ? (
          <form
            onSubmit={unlock}
            className="page-card mx-auto mt-16 max-w-sm rounded-xl p-8 text-center"
          >
            <p className="eyebrow text-gold-deep">Owner only</p>
            <h1 className="mt-3 font-display text-3xl font-semibold text-evergreen">
              Planner dashboard
            </h1>
            <input
              type="password"
              required
              autoFocus
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="Passcode"
              className="mt-6 w-full rounded-md border border-input bg-card px-4 py-3 text-center text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
            />
            {error ? (
              <p role="alert" className="mt-4 text-sm text-berry">
                {error}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-6 w-full rounded-full bg-secondary px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-secondary-foreground transition-colors hover:bg-evergreen-deep disabled:opacity-60"
            >
              {status === "loading" ? "Opening…" : "Open dashboard"}
            </button>
          </form>
        ) : stats ? (
          <div>
            <p className="eyebrow text-gold-deep">Owner only</p>
            <h1 className="mt-2 font-display text-4xl font-semibold text-evergreen">
              Planner dashboard
            </h1>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {CARDS.map((card) => (
                <div key={card.key} className="page-card rounded-xl p-6">
                  <p className={`eyebrow ${card.color}`}>{card.label}</p>
                  <p className="mt-3 font-display text-5xl font-semibold text-evergreen">
                    {stats.totals[card.key].toLocaleString()}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {card.hint}
                  </p>
                </div>
              ))}
            </div>

            <h2 className="mt-10 font-display text-2xl font-semibold text-evergreen">
              Last 14 days
            </h2>
            <div className="page-card mt-4 rounded-xl p-6">
              <div className="space-y-2">
                {stats.daily.map((day) => {
                  const total =
                    day.gumroad_click + day.plan_submitted + day.plan_generated;
                  return (
                    <div key={day.day} className="flex items-center gap-3">
                      <span className="w-20 shrink-0 text-xs text-muted-foreground">
                        {day.day.slice(5)}
                      </span>
                      <div className="flex h-5 flex-1 items-center">
                        <div
                          className="flex h-4 overflow-hidden rounded-sm"
                          style={{ width: `${(total / maxDaily) * 100}%` }}
                        >
                          {day.gumroad_click > 0 ? (
                            <div
                              className="bg-berry"
                              style={{ width: `${(day.gumroad_click / total) * 100}%` }}
                            />
                          ) : null}
                          {day.plan_submitted - day.plan_generated > 0 ? (
                            <div
                              className="bg-evergreen"
                              style={{
                                width: `${((day.plan_submitted - day.plan_generated) / total) * 100}%`,
                              }}
                            />
                          ) : null}
                          {day.plan_generated > 0 ? (
                            <div
                              className="bg-gold"
                              style={{
                                width: `${(day.plan_generated / total) * 100}%`,
                              }}
                            />
                          ) : null}
                        </div>
                      </div>
                      <span className="w-6 shrink-0 text-right text-xs text-muted-foreground">
                        {total > 0 ? total : ""}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-5 flex flex-wrap gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-2">
                  <span className="inline-block h-2.5 w-2.5 rounded-sm bg-berry" />
                  Gumroad clicks
                </span>
                <span className="flex items-center gap-2">
                  <span className="inline-block h-2.5 w-2.5 rounded-sm bg-evergreen" />
                  Plans requested
                </span>
                <span className="flex items-center gap-2">
                  <span className="inline-block h-2.5 w-2.5 rounded-sm bg-gold" />
                  Plans created
                </span>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}

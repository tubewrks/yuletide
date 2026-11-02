import { createServerFn, getRequest } from "@tanstack/react-start";
import {
  extractGatewayMessage,
  runResponsesText,
} from "@/lib/ai/gateway.server";

const GATEWAY_URL = "https://ai.gateway.lovable.dev/v1";
const MODEL = "openai/gpt-6-astra";

const INSTRUCTIONS = `You are the quiet voice behind "The Calm Christmas Planner" (Budget & Hosting Planner) by Tom Ehigh — a 30-page fillable + printable planner. A holiday shopper describes their Christmas situation and you turn it into a calm, personal action plan built on the planner's five sections.

Voice: warm, honest, adult. Short sentences. No hype, no fake urgency, no pressure tactics, no "life-changing miracle". Never mention AI, models or that you are an assistant. Never invent discounts, prices or guarantees. The planner costs $12.99 — only mention the price if suggesting the planner, and state it plainly.

The planner's sections and pages:
- Plan: Christmas at a Glance (total budget, key dates, one-sentence calm intention, top 3 priorities), Budget Overview (category budgets + "if I go over, I'll cut back on…"), December Overview calendar.
- Gifts: Gift List, Purchase Tracker (item, store, price, order number, arrived/wrapped checkboxes), Cards & Thank-Yous.
- Feast: Holiday Menu Planner (courses + what can be made ahead), Recipe Cards, Christmas Day Timeline, Grocery List Shop 1 (non-perishables, weeks early) & Shop 2 (fresh, days before).
- Host: Prep Schedule for December + Final Days, Guest List & RSVPs, Before Guests Arrive checklist.
- Calm: What I'm Skipping (official permission page), Weekly Calm Reset, Christmas Reflection, notes pages.

Output EXACTLY this markdown shape, nothing before or after:
## Where you are
A short paragraph, 2-3 sentences, reflecting their situation warmly and specifically.
## Plan
- 3 imperative steps, each naming the planner page it belongs to (e.g. "Set your total budget on Christmas at a Glance — a number, not a vibe.")
## Gifts
- 3 imperative steps tied to the Gift List / Purchase Tracker / Cards & Thank-Yous
## Feast
- 3 imperative steps tied to the Menu Planner, Timeline or the two grocery shops
## Host
- 3 imperative steps tied to the Prep Schedules, RSVPs or Before Guests Arrive
## Calm
- 3 imperative steps, at least one using the What I'm Skipping page
## One thing to do today
- Exactly one small, doable-today step drawn from their situation.

Rules: every step is one line, at most ~16 words. Steps must reflect the shopper's actual situation (guests, travel, budget, stress). Adapt, but always reference real planner pages. No headings other than the ones above, no bold, no numbered lists.`;

export type CalmPlanSection = {
  key: "plan" | "gifts" | "feast" | "host" | "calm";
  title: string;
  steps: string[];
};

export type CalmPlan = {
  reflection: string;
  sections: CalmPlanSection[];
  firstStep: string;
};

const SECTION_KEYS: { match: string; key: CalmPlanSection["key"]; title: string }[] = [
  { match: "plan", key: "plan", title: "Plan" },
  { match: "gifts", key: "gifts", title: "Gifts" },
  { match: "feast", key: "feast", title: "Feast" },
  { match: "host", key: "host", title: "Host" },
  { match: "calm", key: "calm", title: "Calm" },
];

function parsePlan(text: string): CalmPlan {
  const blocks = text
    .split(/^##\s+/m)
    .map((block) => block.trim())
    .filter(Boolean);

  const bodies = new Map<string, string>();
  for (const block of blocks) {
    const newline = block.indexOf("\n");
    const title = (newline === -1 ? block : block.slice(0, newline)).trim();
    const body = newline === -1 ? "" : block.slice(newline + 1);
    bodies.set(title.toLowerCase(), body);
  }

  const stepsOf = (body: string | undefined) =>
    (body ?? "")
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.startsWith("- "))
      .map((line) => line.slice(2).replace(/[*_]/g, "").trim())
      .filter(Boolean);

  const sections: CalmPlanSection[] = [];
  for (const { match, key, title } of SECTION_KEYS) {
    const steps = stepsOf(bodies.get(match));
    if (steps.length > 0) sections.push({ key, title, steps });
  }

  const reflection =
    (bodies.get("where you are") ?? text.trim())
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .join(" ");

  const firstStep = stepsOf(bodies.get("one thing to do today"))[0] ?? "";

  return { reflection, sections, firstStep };
}

export const generateCalmPlan = createServerFn({ method: "POST" })
  .inputValidator(
    (input: { situation: string; budget?: string; stress?: string }) => {
      const situation = (input?.situation ?? "").trim();
      if (situation.length < 20) {
        throw new Error(
          "Tell me a little more about your Christmas — a sentence or two.",
        );
      }
      if (situation.length > 1500) {
        throw new Error("That's a lot — keep it under 1,500 characters.");
      }
      return {
        situation,
        budget: (input?.budget ?? "").trim().slice(0, 300),
        stress: (input?.stress ?? "").trim().slice(0, 300),
      };
    },
  )
  .handler(async ({ data }): Promise<CalmPlan> => {
    const parts: string[] = [`My Christmas situation: ${data.situation}`];
    if (data.budget) parts.push(`Budget situation: ${data.budget}`);
    if (data.stress) parts.push(`The thing I worry about most: ${data.stress}`);
    parts.push(
      "Build my calm plan from the planner's sections. Follow the output shape exactly.",
    );

    try {
      const text = await runResponsesText(
        getRequest(),
        { baseURL: GATEWAY_URL, apiKey: process.env["LOVABLE_API_KEY"] ?? "", model: MODEL },
        [{ role: "user", content: [{ type: "text", text: parts.join("\n") }] }],
        INSTRUCTIONS,
      );
      if (!text.trim()) {
        throw new Error(
          "The plan came back empty — please try again in a moment.",
        );
      }
      return parsePlan(text);
    } catch (error) {
      throw new Error(extractGatewayMessage(error));
    }
  });

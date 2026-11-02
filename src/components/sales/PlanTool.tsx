import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { generateCalmPlan, type CalmPlan } from "@/lib/planner.functions";
import { PrimaryCta } from "./checkout";
import { Ornament } from "./Ornament";

const SECTION_META: Record<
  CalmPlan["sections"][number]["key"],
  { number: string; color: string }
> = {
  plan: { number: "01", color: "text-section-plan" },
  gifts: { number: "02", color: "text-section-gifts" },
  feast: { number: "03", color: "text-section-feast" },
  host: { number: "04", color: "text-section-host" },
  calm: { number: "05", color: "text-section-calm" },
};

const LOADING_LINES = [
  "Reading your situation…",
  "Choosing your first small step…",
  "Balancing budget, gifts and menu…",
  "Leaving room for what you'll skip…",
];

export function PlanTool() {
  const generate = useServerFn(generateCalmPlan);

  const [situation, setSituation] = useState("");
  const [budget, setBudget] = useState("");
  const [stress, setStress] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );
  const [error, setError] = useState("");
  const [plan, setPlan] = useState<CalmPlan | null>(null);
  const [loadingLine, setLoadingLine] = useState(0);

  useEffect(() => {
    if (status !== "loading") return;
    const timer = setInterval(
      () => setLoadingLine((i) => (i + 1) % LOADING_LINES.length),
      4000,
    );
    return () => clearInterval(timer);
  }, [status]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const result = await generate({ data: { situation, budget, stress } });
      setPlan(result);
      setStatus("done");
    } catch (caught) {
      setError(
        caught instanceof Error && caught.message
          ? caught.message
          : "The plan couldn't be created right now. Please try again in a moment.",
      );
      setStatus("error");
    }
  }

  function reset() {
    setStatus("idle");
    setPlan(null);
    setError("");
  }

  return (
    <section id="your-plan" className="bg-background px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl">
        {status === "idle" || status === "error" ? (
          <div className="text-center">
            <Ornament />
            <p className="eyebrow mt-4 text-gold-deep">Your calm plan</p>
            <h2 className="mt-4 font-display text-4xl font-semibold text-evergreen sm:text-5xl">
              Describe your Christmas.
              <br />
              Get your calm plan.
            </h2>
            <p className="mx-auto mt-5 max-w-xl font-body text-base leading-relaxed text-muted-foreground">
              Tell us how your Christmas actually looks — who&rsquo;s coming,
              what you&rsquo;re hosting, how it usually goes. We&rsquo;ll turn
              it into a personal action plan built on the planner&rsquo;s five
              sections. AI-powered, takes about half a minute.
            </p>

            <form
              onSubmit={handleSubmit}
              className="page-card mx-auto mt-10 max-w-2xl rounded-xl p-6 text-left sm:p-8"
            >
              <label
                htmlFor="situation"
                className="eyebrow block text-gold-deep"
              >
                Your Christmas situation
              </label>
              <textarea
                id="situation"
                required
                rows={4}
                maxLength={1500}
                value={situation}
                onChange={(e) => setSituation(e.target.value)}
                placeholder="e.g. We're hosting 8 people for the first time, my budget feels tight this year, and I always end up panic-shopping gifts on the 22nd…"
                className="mt-3 w-full resize-none rounded-md border border-input bg-card px-4 py-3 font-body text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/60 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
              />

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="budget"
                    className="eyebrow block text-gold-deep"
                  >
                    Budget (optional)
                  </label>
                  <input
                    id="budget"
                    type="text"
                    maxLength={300}
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="e.g. About $400, already feeling stretched"
                    className="mt-3 w-full rounded-md border border-input bg-card px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
                  />
                </div>
                <div>
                  <label
                    htmlFor="stress"
                    className="eyebrow block text-gold-deep"
                  >
                    Biggest stress (optional)
                  </label>
                  <input
                    id="stress"
                    type="text"
                    maxLength={300}
                    value={stress}
                    onChange={(e) => setStress(e.target.value)}
                    placeholder="e.g. Finding gifts for my in-laws in time"
                    className="mt-3 w-full rounded-md border border-input bg-card px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
                  />
                </div>
              </div>

              {status === "error" && error ? (
                <p
                  role="alert"
                  className="mt-5 rounded-md border border-berry/40 bg-berry/5 px-4 py-3 font-body text-sm text-berry"
                >
                  {error}
                </p>
              ) : null}

              <div className="mt-7 flex justify-center">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-secondary px-8 py-4 font-body text-sm font-bold uppercase tracking-[0.18em] text-secondary-foreground shadow-lg shadow-evergreen/25 transition-all hover:-translate-y-0.5 hover:bg-evergreen-deep hover:shadow-xl hover:shadow-evergreen/35"
                >
                  Create my calm plan
                </button>
              </div>
              <p className="mt-4 text-center font-body text-xs text-muted-foreground">
                Nothing is stored — your description is only used to write your
                plan.
              </p>
            </form>
          </div>
        ) : status === "loading" ? (
          <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
            <span className="font-display text-3xl italic text-evergreen">
              ✦
            </span>
            <p
              className="mt-6 font-body text-base text-muted-foreground"
              aria-live="polite"
            >
              {LOADING_LINES[loadingLine]}
            </p>
          </div>
        ) : plan ? (
          <div>
            <div className="text-center">
              <Ornament />
              <p className="eyebrow mt-4 text-gold-deep">Your calm plan</p>
              <h2 className="mt-4 font-display text-4xl font-semibold text-evergreen sm:text-5xl">
                Here&rsquo;s where to start
              </h2>
              {plan.reflection ? (
                <p className="mx-auto mt-6 max-w-xl font-display text-xl italic leading-relaxed text-foreground sm:text-2xl">
                  {plan.reflection}
                </p>
              ) : null}
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {plan.sections.map((section) => {
                const meta = SECTION_META[section.key];
                return (
                  <div
                    key={section.key}
                    className="page-card rounded-xl p-6 sm:p-7"
                  >
                    <p className={`eyebrow ${meta.color}`}>
                      Section {meta.number} · {section.title}
                    </p>
                    <ul className="mt-4 space-y-3">
                      {section.steps.map((step, i) => (
                        <li
                          key={i}
                          className="flex gap-3 font-body text-sm leading-relaxed text-foreground"
                        >
                          <span className="mt-0.5 shrink-0 text-gold-deep">
                            ✦
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            {plan.firstStep ? (
              <div className="starfield relative mt-8 rounded-xl px-8 py-10 text-center">
                <p className="eyebrow text-gold">One thing to do today</p>
                <p className="mx-auto mt-4 max-w-xl font-display text-2xl italic leading-snug text-cream">
                  {plan.firstStep}
                </p>
              </div>
            ) : null}

            <div className="mt-12 flex flex-col items-center gap-4 text-center">
              <p className="font-body text-base text-muted-foreground">
                This plan lives in the planner — page by page, checkbox by
                checkbox.
              </p>
              <PrimaryCta />
              <button
                type="button"
                onClick={reset}
                className="font-body text-sm text-muted-foreground underline decoration-gold/50 decoration-2 underline-offset-[6px] transition-colors hover:text-gold-deep"
              >
                Plan another Christmas
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

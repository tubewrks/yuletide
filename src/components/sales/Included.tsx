import { CHECKOUT_URL, PrimaryCta } from "./checkout";
import coverImg from "@/assets/planner-p1.jpg.asset.json";

const INCLUDED: { title: string; detail: string }[] = [
  {
    title: "Plan",
    detail: "Christmas at a Glance · Budget Overview · December calendar",
  },
  {
    title: "Gifts",
    detail: "Gift List · Purchase Tracker · Cards & Thank-Yous",
  },
  {
    title: "Feast",
    detail:
      "Holiday Menu Planner · Recipe Cards · Christmas Day Timeline · two Grocery Lists",
  },
  {
    title: "Host",
    detail: "Prep Schedules · Guest List & RSVPs · Before Guests Arrive",
  },
  {
    title: "Calm",
    detail:
      "What I’m Skipping · Weekly Calm Reset · Christmas Reflection · notes pages",
  },
];

export function Included() {
  return (
    <section className="bg-background px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="page-card overflow-hidden rounded-xl">
          <div className="grid md:grid-cols-[2fr_3fr]">
            <div className="flex flex-col items-center justify-center gap-6 border-b border-border bg-cream-soft p-10 md:border-b-0 md:border-r">
              <div className="page-card w-44 overflow-hidden rounded-md">
                <img
                  src={coverImg.url}
                  alt="The Calm Christmas Planner cover"
                  className="w-full"
                />
              </div>
              <div className="text-center">
                <p className="eyebrow text-gold-deep">One-time purchase</p>
                <p className="mt-2 font-display text-5xl font-semibold text-evergreen">
                  $12.99
                </p>
                <p className="mt-1 font-body text-sm text-muted-foreground">
                  yours to keep, year after year
                </p>
              </div>
            </div>

            <div className="p-8 sm:p-12">
              <h2 className="font-display text-3xl font-semibold text-evergreen sm:text-4xl">
                What&rsquo;s included
              </h2>
              <p className="mt-3 font-body text-base leading-relaxed text-muted-foreground">
                30 pages, fillable on your device or printed at home — in both
                A4 and US Letter. Instant download.
              </p>

              <ul className="mt-8 space-y-4">
                {INCLUDED.map((item) => (
                  <li key={item.title} className="flex gap-3">
                    <span className="mt-0.5 font-display text-lg text-gold-deep">
                      ✦
                    </span>
                    <div>
                      <p className="font-body text-sm font-bold uppercase tracking-[0.2em] text-foreground">
                        {item.title}
                      </p>
                      <p className="mt-1 font-body text-sm leading-relaxed text-muted-foreground">
                        {item.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-col items-start gap-4">
                <PrimaryCta />
                <p className="font-body text-xs text-muted-foreground">
                  Secure checkout via{" "}
                  <a
                    href={CHECKOUT_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="underline decoration-gold underline-offset-2 hover:text-gold-deep"
                  >
                    Gumroad
                  </a>{" "}
                  · delivered instantly by email
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

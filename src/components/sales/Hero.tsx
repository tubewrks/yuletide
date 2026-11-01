import { PrimaryCta } from "./checkout";

const TAGS = ["Gifts", "Menu", "Groceries", "Schedule", "Guests", "Calm"];

const STARS = [
  { top: "6%", left: "8%" },
  { top: "12%", left: "90%" },
  { top: "50%", left: "4%" },
  { top: "48%", left: "94%" },
  { top: "90%", left: "10%" },
  { top: "92%", left: "88%" },
];

export function Hero() {
  return (
    <section className="starfield relative flex min-h-[92vh] items-center justify-center overflow-hidden px-4 py-16">
      {STARS.map((s, i) => (
        <span
          key={i}
          className="corner-star opacity-70"
          style={{ top: s.top, left: s.left }}
        >
          ✦
        </span>
      ))}

      <div className="cover-frame relative w-full max-w-3xl px-6 py-16 text-center sm:px-12 sm:py-20">
        <span className="corner-star -top-2 -left-1.5">✦</span>
        <span className="corner-star -top-2 -right-1.5">✦</span>
        <span className="corner-star -bottom-2 -left-1.5">✦</span>
        <span className="corner-star -bottom-2 -right-1.5">✦</span>

        <p className="eyebrow mb-10 text-gold/80">Budget &amp; Hosting Planner</p>

        <h1 className="font-display text-cream">
          <span className="block text-4xl font-medium italic sm:text-5xl">The Calm</span>
          <span className="mt-2 block text-5xl font-semibold tracking-[0.06em] uppercase sm:text-7xl">
            Christmas
          </span>
          <span className="eyebrow mt-4 block text-sm text-gold sm:text-base">Planner</span>
        </h1>

        <p className="mx-auto mt-10 max-w-xl font-body text-base leading-relaxed text-cream/85 sm:text-lg">
          One 30-page planner for the budget, the gifts, the menu and the
          hosting — so December can feel like Christmas again.
        </p>

        <div className="relative z-10 mt-10">
          <span className="ribbon eyebrow text-xs sm:text-sm">
            Budget &amp; Hosting Planner
          </span>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-2.5">
          {TAGS.map((tag) => (
            <span key={tag} className="pill pill-light">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-5">
          <PrimaryCta />
          <a
            href="#inside"
            className="font-body text-sm text-cream/70 underline decoration-gold/50 decoration-2 underline-offset-[6px] transition-colors hover:text-gold"
          >
            See what&rsquo;s inside
          </a>
        </div>

        <p className="eyebrow mt-10 text-[0.6rem] text-cream/50">
          30 pages · Fillable &amp; printable · A4 + US Letter
        </p>
      </div>
    </section>
  );
}

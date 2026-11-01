import { PrimaryCta } from "./checkout";
import { Ornament } from "./Ornament";
import { CHECKOUT_URL } from "./checkout";

export function Close() {
  return (
    <>
      <section className="bg-background px-4 pb-24">
        <div className="mx-auto max-w-2xl text-center">
          <Ornament />
          <div className="calm-prose mt-10 text-left text-foreground">
            <p>That&rsquo;s the whole pitch, honestly.</p>
            <p>
              This planner won&rsquo;t make you a better host or a more
              generous gift-giver. It just makes sure the decisions get made
              once, early, calmly — so your energy goes to the people and the
              moments instead of the panic.
            </p>
            <p>
              Christmas was never meant to be a performance you survive. A
              little paper and a quiet evening in November can give you a
              December that feels like Christmas again.
            </p>
            <p>
              If that&rsquo;s what you&rsquo;re after, the planner is ready when
              you are.
            </p>
          </div>

          <div className="mt-10 flex flex-col items-center gap-3">
            <PrimaryCta />
            <p className="eyebrow text-[0.6rem] text-muted-foreground">
              $12.99 · Instant download · A4 + US Letter
            </p>
          </div>
        </div>
      </section>

      <footer className="bg-evergreen-deep px-4 py-12">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-3 text-center">
          <p className="font-display text-xl italic text-cream">
            The Calm Christmas Planner
          </p>
          <p className="eyebrow text-[0.6rem] text-gold/80">by Tom Ehigh</p>
          <a
            href={CHECKOUT_URL}
            target="_blank"
            rel="noreferrer"
            className="font-body text-xs text-cream/60 underline decoration-cream/30 underline-offset-4 transition-colors hover:text-cream"
          >
            Get the planner on Gumroad
          </a>
          <p className="mt-2 font-body text-[0.7rem] text-cream/40">
            © 2026 Tom Ehigh · Budget &amp; Hosting Planner · 30 pages
          </p>
        </div>
      </footer>
    </>
  );
}

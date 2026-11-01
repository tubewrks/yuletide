import { PrimaryCta } from "./checkout";
import { Ornament } from "./Ornament";

export function December() {
  return (
    <section className="starfield relative overflow-hidden px-4 py-20 sm:py-28">
      <span className="corner-star top-10 left-[12%] opacity-60">✦</span>
      <span className="corner-star top-16 right-[15%] opacity-60">✦</span>
      <span className="corner-star bottom-12 left-[20%] opacity-60">✦</span>
      <span className="corner-star bottom-16 right-[10%] opacity-60">✦</span>

      <div className="mx-auto max-w-2xl text-center">
        <Ornament />
        <p className="eyebrow mt-4 text-gold">A different December</p>

        <h2 className="mt-4 font-display text-4xl font-semibold text-cream sm:text-5xl">
          What this December can feel like
        </h2>

        <div className="calm-prose mt-10 text-left text-cream/90">
          <p>
            You know exactly what you&rsquo;re spending — and what you&rsquo;re
            skipping — before the sales hit. Every gift, order and thank-you
            lives in one place, so nothing falls through the cracks. The menu
            is doable, and the shopping is two clear trips instead of an
            endless list.
          </p>
          <p>
            Christmas Day has a timeline, so it feels managed rather than
            manic. When things get loud, there&rsquo;s a page that reminds you
            what you deliberately let go of. And at the end of it all, you get
            to feel proud and calm instead of exhausted and broke.
          </p>
          <p className="!mb-0 font-display text-2xl italic text-cream">
            Which is, I think, the whole point.
          </p>
        </div>

        <div className="mt-12 flex flex-col items-center gap-4">
          <PrimaryCta />
          <p className="font-body text-sm text-cream/60">
            It takes about one quiet evening to fill in.
          </p>
        </div>
      </div>
    </section>
  );
}

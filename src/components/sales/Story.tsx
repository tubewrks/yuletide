import { Ornament } from "./Ornament";

export function Story() {
  return (
    <section className="bg-background px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <Ornament />
          <p className="eyebrow mt-4 text-gold-deep">Where it started</p>
        </div>

        <div className="calm-prose mt-12 text-foreground">
          <p className="dropcap">
            I used to think I was just bad at Christmas.
          </p>

          <p>
            Every year it went the same way. November disappeared somewhere,
            and then it was the first week of December and I hadn&rsquo;t bought
            a single gift, I had no idea what I was cooking, and I&rsquo;d
            already spent more than I meant to — mostly on things nobody
            actually asked for.
          </p>

          <p>
            So I&rsquo;d panic. I&rsquo;d make lists in my head instead of on
            paper. I&rsquo;d write three grocery lists and lose two of them.
            And somewhere around the 23rd, in a crowded shop, buying wrapping
            paper at full price, I&rsquo;d get that familiar heavy feeling.
          </p>

          <p className="font-display text-2xl italic leading-snug text-evergreen sm:text-[1.7rem]">
            This year is going to be stressful again.
          </p>

          <p>It was. For years, it was.</p>
        </div>

        <div className="mt-20 border-t border-border pt-16">
          <div className="calm-prose text-foreground">
            <p>
              <strong>Maybe you know how it goes.</strong>
            </p>

            <p>
              The money is the quiet one. Nobody decides a number before the
              sales start, so the spending just&hellip; drifts. A little treat
              here, a top-up shop there, and by Boxing Day the card statement
              feels like a guest who overstayed.
            </p>

            <p>
              The gifts come second. The list lives in your head, which means
              someone gets forgotten until the last minute, someone gets the
              same candle as last year, and the good ones are either sold out
              or cost double to arrive on time.
            </p>

            <p>
              Then hosting. The menu is &ldquo;in my head&rdquo; until three
              days before, which somehow turns into five grocery trips, two
              dishes nobody eats, and a Christmas morning spent firefighting in
              the kitchen instead of sitting in it.
            </p>

            <p>
              And underneath all of it, that low hum you can&rsquo;t quite
              switch off — the pressure to make everything perfect, the feeling
              of already being behind before December even starts, and the
              sense that the actual feeling of Christmas has quietly slipped
              beneath the tasks, the money and the expectations.
            </p>
          </div>
        </div>

        <div className="mt-20">
          <div className="starfield relative mx-auto max-w-xl rounded-lg px-8 py-12 text-center">
            <span className="corner-star -top-2 left-6 opacity-80">✦</span>
            <span className="corner-star -top-2 right-6 opacity-80">✦</span>
            <span className="corner-star -bottom-2 left-6 opacity-80">✦</span>
            <span className="corner-star -bottom-2 right-6 opacity-80">✦</span>
            <p className="eyebrow text-gold/80">The turning point</p>
            <div className="calm-prose mt-6 text-cream">
              <p className="!mb-0 font-display text-2xl italic leading-snug sm:text-[1.7rem]">
                Last January, while the decorations went back in the loft, I
                wrote down what had actually gone wrong. Not vaguely —
                specifically. And I noticed something: the problem was never
                effort. Every decision was being made at the worst possible
                moment — late, tired, in a shop, surrounded by sales and
                everyone else&rsquo;s expectations.
              </p>
            </div>
          </div>
        </div>

        <div className="calm-prose mt-16 text-foreground">
          <p>So I made one decision, and it changed everything:</p>

          <p className="font-display text-3xl italic leading-snug text-evergreen sm:text-4xl">
            Everything important gets decided in November — the number, the
            gifts, the menu, the plan — on paper, in one place.
          </p>

          <p>
            I went looking for a planner that worked that way and couldn&rsquo;t
            find one. So I built it.
          </p>
        </div>
      </div>
    </section>
  );
}

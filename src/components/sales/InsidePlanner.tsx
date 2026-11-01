import planImg from "@/assets/planner-p4.jpg.asset.json";
import giftsImg from "@/assets/planner-p11.jpg.asset.json";
import feastImg from "@/assets/planner-p14.jpg.asset.json";
import hostImg from "@/assets/planner-p23.jpg.asset.json";
import calmImg from "@/assets/planner-p27.jpg.asset.json";
import { Ornament } from "./Ornament";

type Section = {
  number: string;
  name: string;
  motto: string;
  color: string;
  image: { url: string };
  alt: string;
  paragraphs: string[];
  reverse?: boolean;
};

const SECTIONS: Section[] = [
  {
    number: "01",
    name: "Plan",
    motto: "Set the numbers and the mood before you spend a thing.",
    color: "text-section-plan",
    image: planImg,
    alt: "Christmas at a Glance planner page with budget, key dates and priorities",
    paragraphs: [
      "It starts with one page: Christmas at a Glance. You set your total budget, your key dates, a one-sentence intention for how you want this Christmas to feel, and your top three priorities — the three things that actually matter this year.",
      "Then the Budget Overview, where every category gets a number, and — this is the important line — a written answer to “if I go over, I’ll cut back on…”. You decide your trade-offs in November, calmly, instead of in the checkout queue.",
      "The December Overview calendar ties it together: deadlines, shop days and events, one month on a single page.",
    ],
  },
  {
    number: "02",
    name: "Gifts",
    motto: "One place for every gift, order and thank-you.",
    color: "text-section-gifts",
    image: giftsImg,
    alt: "Purchase Tracker planner page with item, store, price and checkbox columns",
    reverse: true,
    paragraphs: [
      "One list for every person, one tracker for every purchase. The Gift List keeps names, ideas and budgets in one place, and the Purchase Tracker gives every gift its own row: what it is, where it’s from, what it cost, the order number — and three little checkboxes: arrived, wrapped, done.",
      "No more “did that one ship?” at eleven at night. Cards & Thank-Yous get their own pages too, because those are usually the first thing to fall through the cracks.",
    ],
  },
  {
    number: "03",
    name: "Feast",
    motto: "A simple menu and two clear grocery shops.",
    color: "text-section-feast",
    image: feastImg,
    alt: "Holiday Menu Planner page with courses, make-ahead column and dietary notes",
    paragraphs: [
      "The Holiday Menu Planner turns “the food is in my head” into one page: starters, main, sides, desserts and drinks — with a column for what can be made ahead, because that’s where Christmas Day is actually won.",
      "The Christmas Day Timeline then walks the day itself, hour by hour — what goes in the oven when, and when you sit down. And the grocery list is split into two shops: Shop 1 for the non-perishables you can buy weeks early, Shop 2 for the fresh stuff days before. Two clear trips instead of five panicked ones.",
    ],
  },
  {
    number: "04",
    name: "Host",
    motto: "Prep early, welcome warmly, enjoy your own party.",
    color: "text-section-host",
    image: hostImg,
    alt: "Before Guests Arrive checklist page for house, table, drinks and guest comfort",
    reverse: true,
    paragraphs: [
      "The Prep Schedule spreads the hosting work across December, then a second page covers the final days — so the last 48 hours are small jobs instead of a mountain.",
      "Guest List & RSVPs keeps numbers, dietary needs and who’s bringing what in one place. And Before Guests Arrive is a calm, room-by-room checklist — house, table, drinks, atmosphere, guest comfort — so you can welcome people warmly and actually enjoy your own party.",
    ],
  },
  {
    number: "05",
    name: "Calm",
    motto: "Permission to keep it simple, and space to reflect.",
    color: "text-section-calm",
    image: calmImg,
    alt: "Christmas Reflection page with prompts for what worked and what to change",
    paragraphs: [
      "Here’s the section most planners skip — and honestly, the one that matters most.",
      "What I’m Skipping is one page of permission: the things you are officially not doing this year, decided before the guilt kicks in. The Weekly Calm Reset gives you a few quiet minutes each week to check money, tasks and energy. And the Christmas Reflection closes the season — what worked, what to change, what you’d skip next year — so next Christmas starts smarter than this one.",
      "Plus notes pages, because Christmas always generates notes.",
    ],
  },
];

export function InsidePlanner() {
  return (
    <section id="inside" className="bg-cream-soft px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <Ornament />
          <p className="eyebrow mt-4 text-gold-deep">Inside the planner</p>
          <h2 className="mt-4 font-display text-4xl font-semibold text-evergreen sm:text-5xl">
            How it works, section by section
          </h2>
          <p className="mx-auto mt-5 max-w-xl font-body text-base leading-relaxed text-muted-foreground">
            Five short sections. Fill them in over one quiet evening, and the
            whole season is decided before the sales hit.
          </p>
        </div>

        <div className="mt-16 space-y-16 sm:mt-20 sm:space-y-24">
          {SECTIONS.map((section) => (
            <article
              key={section.name}
              className="grid items-center gap-10 md:grid-cols-2 md:gap-14"
            >
              <div className={section.reverse ? "md:order-2" : ""}>
                <p className={`eyebrow ${section.color}`}>
                  Section {section.number} · {section.name}
                </p>
                <h3 className="mt-3 font-display text-3xl font-semibold text-foreground sm:text-4xl">
                  {section.motto}
                </h3>
                <div className="calm-prose mt-6 text-[0.95rem] text-muted-foreground">
                  {section.paragraphs.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <div className={section.reverse ? "md:order-1" : ""}>
                <div className="page-card mx-auto max-w-sm overflow-hidden rounded-md p-2 transition-transform duration-300 hover:-translate-y-1 hover:rotate-0">
                  <img
                    src={section.image.url}
                    alt={section.alt}
                    loading="lazy"
                    className="w-full rounded-[4px]"
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

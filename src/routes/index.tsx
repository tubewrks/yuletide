import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/sales/Hero";
import { Story } from "@/components/sales/Story";
import { InsidePlanner } from "@/components/sales/InsidePlanner";
import { December } from "@/components/sales/December";
import { Included } from "@/components/sales/Included";
import { Close } from "@/components/sales/Close";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "The Calm Christmas Planner — a calmer, budgeted Christmas",
      },
      {
        name: "description",
        content:
          "One quiet evening in November decides your whole Christmas: budget, gifts, menu and hosting. 30 fillable pages, A4 + US Letter, $12.99.",
      },
      {
        property: "og:title",
        content: "The Calm Christmas Planner — a calmer, budgeted Christmas",
      },
      {
        property: "og:description",
        content:
          "Budget, gifts, menu and hosting — decided in November, on paper, in one place. 30-page fillable planner, $12.99.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SalesPage,
});

function SalesPage() {
  return (
    <main className="bg-background font-body text-foreground">
      <Hero />
      <Story />
      <InsidePlanner />
      <December />
      <Included />
      <Close />
    </main>
  );
}

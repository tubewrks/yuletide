<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Architecture
- The sales page is a single landing page at `/` built from sections in `src/components/sales/*` (Hero, Story, InsidePlanner, December, Included, Close); shared CTA/pricing constants live in `src/components/sales/checkout.tsx`.
- The AI plan feature calls the Lovable AI Gateway from `src/lib/planner.functions.ts` via the server-only helper `src/lib/ai/gateway.server.ts` (Responses endpoint, final text consumed server-side); never import the `.server` module from client code, and keep prompts server-side.
- Analytics events (`plan_submitted`, `plan_generated`, `gumroad_click`) are recorded via `track()` from `src/lib/analytics.functions.ts` into the `site_events` table; the owner dashboard lives at `/dashboard` and is gated by the `DASHBOARD_PASSCODE` secret checked inside `getDashboardStats` — keep that route noindex and never link it from the sales page.

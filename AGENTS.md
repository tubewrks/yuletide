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

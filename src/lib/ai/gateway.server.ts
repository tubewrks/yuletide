import { createOpenAI } from "@ai-sdk/openai";
import { streamText, type ModelMessage } from "ai";

/**
 * Server-only Lovable AI Gateway helpers (OpenAI Responses endpoint).
 * Copy of the shared run-ID helper plus a final-only text call.
 * Never import this module from client code.
 */

const LOVABLE_AIG_RUN_ID_HEADER = "X-Lovable-AIG-Run-ID";

export function createLovableAiGatewayRunIdFetch(initialRunId?: string) {
  let runId = initialRunId?.trim() || undefined;
  return {
    fetch: async (input: RequestInfo | URL, init?: RequestInit) => {
      const headers = new Headers(init?.headers);
      if (runId && !headers.has(LOVABLE_AIG_RUN_ID_HEADER)) {
        headers.set(LOVABLE_AIG_RUN_ID_HEADER, runId);
      }
      const response = await fetch(input, { ...init, headers });
      runId ??=
        response.headers.get(LOVABLE_AIG_RUN_ID_HEADER)?.trim() || undefined;
      return response;
    },
    getRunId: () => runId,
  };
}

export function getLovableAiGatewayRunId(request: Request) {
  return (
    request.headers.get(LOVABLE_AIG_RUN_ID_HEADER)?.trim() || undefined
  );
}

export function extractGatewayMessage(error: unknown): string {
  const raw =
    typeof error === "object" && error !== null
      ? ((error as { responseBody?: unknown }).responseBody ??
        (error as { message?: unknown }).message)
      : undefined;
  if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw) as { error?: { message?: unknown } };
      const message = parsed?.error?.message;
      if (typeof message === "string" && message.trim()) return message.trim();
    } catch {
      // not JSON — fall through
    }
    if (raw.trim()) return raw.trim();
  }
  return "The plan couldn't be created right now. Please try again in a moment.";
}

export async function runResponsesText(
  request: Request,
  config: { baseURL: string; apiKey: string; model: string },
  messages: ModelMessage[],
  instructions?: string,
): Promise<string> {
  const runIdFetch = createLovableAiGatewayRunIdFetch(
    getLovableAiGatewayRunId(request),
  );
  const provider = createOpenAI({
    baseURL: `${config.baseURL.replace(/\/+$/, "").replace(/\/v1$/, "")}/v1`,
    apiKey: config.apiKey,
    headers: {
      "Lovable-API-Key": config.apiKey,
      "X-Lovable-AIG-SDK": "vercel-ai-sdk",
    },
    fetch: runIdFetch.fetch,
  });
  const result = streamText({
    model: provider.responses(config.model),
    ...(instructions ? { instructions } : {}),
    messages,
    abortSignal: request.signal,
    providerOptions: {
      openai: {
        store: false,
        forceReasoning: true,
        reasoningEffort: "medium",
        reasoningSummary: "auto",
        include: ["reasoning.encrypted_content"],
      },
    },
  });
  // Final-only feature: consume the stream server-side and return the text.
  return await result.text;
}

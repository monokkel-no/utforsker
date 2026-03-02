interface Model {
  id: string;
  name: string;
  provider: string;
}

export const models = [
  { id: "claude-opus-4-6", name: "claude-opus-4-6", provider: "Anthropic" },
  { id: "claude-sonnet-4-6", name: "claude-sonnet-4-6", provider: "Anthropic" },
  { id: "claude-haiku-4-5", name: "claude-haiku-4-5", provider: "Anthropic" },

  { id: "normistral-11b-warm", name: "norallm/normistral-11b-warm", provider: "NoraLLM" },

  { id: "gpt-4o", name: "GPT-4o", provider: "OpenAI" },
  { id: "gpt-4o-mini", name: "GPT-4o Mini", provider: "OpenAI" },
] as const satisfies readonly Model[];

export type ModelId = (typeof models)[number]["id"];

export const defaultModelId: ModelId = "claude-haiku-4-5";

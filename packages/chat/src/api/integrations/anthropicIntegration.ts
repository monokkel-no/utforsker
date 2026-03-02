import Anthropic from "@anthropic-ai/sdk";
import type { models } from "../../models.js";
import type { Message } from "../../types.js";

export const anthropicIntegration = async (model: (typeof models)[number], messages: Message[]) => {
  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  const systemMessages = messages.filter((message) => message.role === "system");

  const conversationMessages = messages.filter((message) => message.role !== "system");

  const systemPrompt =
    systemMessages.length > 0 ? systemMessages.map((message) => message.content).join("\n\n") : undefined;

  const completion = await anthropic.messages.create({
    model: model.id,
    max_tokens: 8192,
    system: systemPrompt,
    messages: conversationMessages.map((msg) => ({
      role: msg.role as "user" | "assistant",
      content: msg.content,
    })),
  });

  const reply = completion.content[0];

  if (reply?.type === "text") {
    return { role: "assistant" as const, content: reply.text };
  }

  return null;
};

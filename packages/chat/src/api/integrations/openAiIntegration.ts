import OpenAI from "openai";
import type { models } from "../../models.js";
import type { Message } from "../../types.js";

export const openAiIntegration = async (model: (typeof models)[number], messages: Message[]) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const completion = await openai.chat.completions.create({
    model: model.name,
    messages: messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    })),
  });

  const reply = completion.choices[0]?.message;

  return reply;
};

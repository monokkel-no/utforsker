import type { Message } from "@repo/chat/types.js";
import { models, type ModelId } from "../models.js";
import { openAiIntegration } from "./integrations/openAiIntegration.js";
import { huggingFaceIntegration } from "./integrations/huggingFaceIntegration.js";
import { anthropicIntegration } from "./integrations/anthropicIntegration.js";

interface Options {
  modelId: ModelId;
  messages: Message[];
}

export const sendChatMessage = async ({ modelId, messages }: Options): Promise<Message> => {
  try {
    const model = models.find((m) => m.id === modelId);

    if (!model) {
      throw new Error(`Model ${modelId} not found`);
    }

    const reply = await send(model, messages);

    if (!reply) {
      throw new Error("No reply from model");
    }

    return {
      id: Date.now(),
      role: "assistant",
      content: reply,
    };
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};

const send = async (model: (typeof models)[number], messages: Message[]) => {
  switch (model.provider) {
    case "OpenAI": {
      const response = await openAiIntegration(model, messages);
      return response?.content ?? "";
    }
    case "NoraLLM": {
      const response = await huggingFaceIntegration(model, messages);
      return response?.content ?? "";
    }
    case "Anthropic": {
      const response = await anthropicIntegration(model, messages);
      return response?.content ?? "";
    }
  }
};

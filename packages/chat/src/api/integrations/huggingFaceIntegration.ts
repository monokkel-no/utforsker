import type { models } from "../../models.js";
import type { Message } from "../../types.js";
import { InferenceClient } from "@huggingface/inference";

export const huggingFaceIntegration = async (
  model: (typeof models)[number],
  messages: Message[],
): Promise<{ role: string; content: string } | undefined> => {
  const hf = new InferenceClient(process.env.HUGGING_FACE_TOKEN);

  const completion = await hf.chatCompletion({
    model: model.name,
    messages: messages.map((message) => ({
      role: message.role,
      content: message.content,
    })),
    max_tokens: 512,
  });

  const reply = completion.choices[0]?.message;

  console.log("MORM", reply);

  if (!reply?.content) {
    return undefined;
  }

  return {
    role: reply.role,
    content: reply.content,
  };
};

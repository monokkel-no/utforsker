import { sendChatMessage as sendChatMessageApi } from "@repo/chat/api/sendChatMessage.js";
import type { ModelId } from "@repo/chat/models.js";
import type { Message } from "@repo/chat/types.js";
import { createServerFn } from "@tanstack/react-start";

export interface SendChatMessageOptions {
  messages: Message[];
  modelId: ModelId;
}

export const sendChatMessage = createServerFn({
  method: "POST",
})
  .inputValidator((data: SendChatMessageOptions) => data)
  .handler(async ({ data }) => {
    const { messages, modelId } = data;
    return sendChatMessageApi({ messages, modelId });
  });

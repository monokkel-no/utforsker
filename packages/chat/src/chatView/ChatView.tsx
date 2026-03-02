import { useState } from "react";
import { defaultModelId, type ModelId } from "../models.js";
import type { Message } from "../types.js";
import { ChatInput } from "./ChatInput.js";
import { MessageList } from "./MessageList.js";

export interface UserMessageOptions {
  modelId: ModelId;
  message: Message;
}

interface Props {
  messages: Message[];
  onUserMessage: (options: UserMessageOptions) => void;
  onModelChange?: (modelId: ModelId) => void;
}

export function ChatView({ messages, onUserMessage, onModelChange }: Props) {
  const [selectedModelId, setSelectedModelId] = useState<ModelId>(defaultModelId);

  const handleModelChange = (modelId: ModelId) => {
    setSelectedModelId(modelId);
    onModelChange?.(modelId);
  };

  const handleSend = (text: string) => {
    onUserMessage({
      modelId: selectedModelId,
      message: { id: Date.now(), role: "user", content: text },
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <MessageList messages={messages} />
      <ChatInput onSend={handleSend} selectedModelId={selectedModelId} onModelChange={handleModelChange} />
    </div>
  );
}

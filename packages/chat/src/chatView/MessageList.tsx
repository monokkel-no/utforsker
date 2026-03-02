import { type ReactNode, useRef } from "react";
import type { Message } from "../types.js";
import { MessageContent } from "./MessageContent.js";
import { cssVariables } from "@repo/ui-theme/css-variables";

interface Props {
  messages: Message[];
}

export function MessageList({ messages }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  return (
    <div
      style={{
        flex: 1,
        overflowY: "auto",
        padding: "24px 16px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      {messages.map((message, index) => (
        <div
          key={index}
          style={{ display: "flex", justifyContent: message.role === "user" ? "flex-end" : "flex-start" }}
        >
          <Bubble role={message.role}>
            {message.role === "user" && <span>{message.content}</span>}

            {message.role === "system" && (
              <details>
                <summary>System prompt</summary>
                <MessageContent content={message.content} />
              </details>
            )}

            {message.role === "assistant" && <MessageContent content={message.content} />}
          </Bubble>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}

interface BubbleProps {
  children: ReactNode;
  role: "user" | "assistant" | "system";
}

const Bubble = ({ children, role }: BubbleProps) => {
  const backgroundColor =
    role === "user" ? cssVariables.palette.primary.main : cssVariables.palette.surfaceBackground.dark;
  const color =
    role === "user" ? cssVariables.palette.primary.contrastText : cssVariables.palette.surfaceBackground.contrastText;
  return (
    <div
      style={{
        maxWidth: "70%",
        padding: "10px 14px",
        borderRadius: role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
        backgroundColor,
        color,
      }}
    >
      {children}
    </div>
  );
};

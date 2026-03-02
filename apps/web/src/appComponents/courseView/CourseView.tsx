import { ChatView, type UserMessageOptions } from "@repo/chat/chatView/ChatView.js";
import type { Message } from "@repo/chat/types.js";
import { UserRole } from "@repo/core/types.ts";
import { CourseTree } from "@repo/course-browser/CourseTree.js";
import { FileEditor } from "@repo/file-editor/FileEditor.js";
import { KnowledgeGraph } from "@repo/knowledge-graph/KnowledgeGraph.js";
import type { GraphData } from "@repo/knowledge-graph/types.js";
import { Group, Panel, Separator } from "@repo/ui-components/resizablePanels";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { SendChatMessageOptions } from "../../routes/-api/chat";
import type { AnalyzeKnowledgeGraphOptions } from "../../routes/-api/knowledgeGraph";
import { AppLayout } from "../appLayout/AppLayout";

interface Props {
  files: string[];
  content?: string;
  initialMessages: Message[];
  userRole: UserRole;
  selectedPath?: string;
  onSendChatMessage: (options: SendChatMessageOptions) => Promise<Message>;
  onAnalyzeKnowledgeGraph: (options: AnalyzeKnowledgeGraphOptions) => Promise<GraphData>;
}

export const CourseView = ({
  files,
  content,
  initialMessages,
  userRole,
  selectedPath,
  onSendChatMessage,
  onAnalyzeKnowledgeGraph,
}: Props) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const navigate = useNavigate();

  useEffect(() => setMessages(initialMessages), [initialMessages]);

  const navigateToUserRole = (userRole: UserRole) => {
    navigate({ to: "/$userRole/courses/$", params: { userRole, _splat: selectedPath } });
  };

  const navigateToCourse = (path: string) => {
    navigate({ to: "/$userRole/courses/$", params: { userRole, _splat: path } });
  };

  const handleUserMessage = async (options: UserMessageOptions) => {
    const updatedMessages = [...messages, options.message];
    setMessages(updatedMessages);
    const reply = await onSendChatMessage({ messages: updatedMessages, modelId: options.modelId });
    setMessages((current) => [...current, reply]);
  };

  return (
    <AppLayout userRoleSwitch={{ userRole, navigateToUserRole }}>
      <Group orientation="horizontal" style={{ height: "100%" }}>
        <Panel defaultSize={312} minSize={10} maxSize={312}>
          <CourseTree files={files} selectedPath={selectedPath} onSelect={navigateToCourse} />
        </Panel>
        <Separator />
        <Panel>
          {userRole === UserRole.Teacher ? (
            <FileEditor value={content ?? ""} />
          ) : (
            <ChatView messages={messages} onUserMessage={handleUserMessage} />
          )}
        </Panel>
        <Separator />
        <Panel defaultSize={96} minSize={96} maxSize={96}>
          <KnowledgeGraph
            messages={messages.filter((message) => message.role !== "system")}
            onAnalyze={(messages) => onAnalyzeKnowledgeGraph({ messages })}
          />
        </Panel>
      </Group>
    </AppLayout>
  );
};

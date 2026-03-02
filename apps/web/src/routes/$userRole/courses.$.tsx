import { analyzeKnowledgeGraph } from "../-api/knowledgeGraph";
import type { UserRole } from "@repo/core/types.ts";
import type { Message } from "@repo/chat/types.js";
import { createFileRoute } from "@tanstack/react-router";
import { getCourseFile, getCourseTree } from "../-api/courses";
import { CourseView } from "../../appComponents/courseView/CourseView";
import { sendChatMessage } from "../-api/chat";

export const Route = createFileRoute("/$userRole/courses/$")({
  loader: async ({ params }) => {
    const files = await getCourseTree();
    const content = params._splat ? await getCourseFile({ data: { path: params._splat } }) : undefined;
    const initialMessages: Message[] = [
      {
        id: 1,
        role: "system",
        content: content?.trim() ?? "",
      },
    ];
    return { files, content, initialMessages };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { files, content, initialMessages } = Route.useLoaderData();
  const { userRole, _splat: selectedPath } = Route.useParams();
  return (
    <CourseView
      files={files}
      content={content}
      initialMessages={initialMessages}
      userRole={userRole as UserRole}
      selectedPath={selectedPath}
      onSendChatMessage={(options) => sendChatMessage({ data: options })}
      onAnalyzeKnowledgeGraph={(options) => analyzeKnowledgeGraph({ data: options })}
    />
  );
}

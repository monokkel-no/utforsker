import type { Message } from "@repo/chat/types.js";
import type { GraphData } from "@repo/knowledge-graph/types.js";
import { createServerFn } from "@tanstack/react-start";

const systemPrompt = `You are an educational analysis assistant.
Given a tutoring conversation, extract a knowledge graph of the topics the student has been exploring.

Return ONLY a valid JSON object with this exact shape:
{
  "nodes": [
    { "id": "1", "label": "<topic name>", "status": "<status>" }
  ],
  "edges": [
    { "id": "e1-2", "source": "1", "target": "2", "label": "<optional relationship>" }
  ]
}

Status values (choose the most accurate for each topic based on the conversation):
- "not_started"  — mentioned but not yet discussed
- "exploring"    — the student is actively asking questions about it
- "understood"   — the student demonstrated basic understanding
- "mastered"     — the student answered correctly and confidently

Rules:
- Create one node per distinct topic or concept.
- Use edges to show prerequisite or thematic relationships between topics.
- Keep labels short (2–4 words max).
- Include only topics that appear in the conversation.
- Do not include any text outside the JSON object.`;

export interface AnalyzeKnowledgeGraphOptions {
  messages: Message[];
}

export const analyzeKnowledgeGraph = createServerFn({ method: "POST" })
  .inputValidator((data: AnalyzeKnowledgeGraphOptions) => data)
  .handler(async ({ data }) => {
    try {
      console.log("TODO: Implement analyzeKnowledgeGraph", systemPrompt, data);

      return {} as GraphData;
    } catch (error) {
      console.error("Error in analyzeKnowledgeGraph:", error);
      throw error;
    }
  });

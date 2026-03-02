import type { Message } from "@repo/chat/types.js";
import { Background, Controls, Handle, Position, ReactFlow, type Node, type Edge } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useState } from "react";
import type { GraphData, NodeStatus } from "./types.js";

interface Props {
  messages: Message[];
  onAnalyze: (messages: Message[]) => Promise<GraphData>;
}

const STATUS_COLORS: Record<NodeStatus, { background: string; border: string; color: string }> = {
  not_started: { background: "#f5f5f5", border: "#bdbdbd", color: "#616161" },
  exploring: { background: "#fff9c4", border: "#f9a825", color: "#5d4037" },
  understood: { background: "#c8e6c9", border: "#388e3c", color: "#1b5e20" },
  mastered: { background: "#bbdefb", border: "#1565c0", color: "#0d47a1" },
};

function TopicNode({ data }: { data: { label: string; status: NodeStatus } }) {
  const colors = STATUS_COLORS[data.status];
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div
        style={{
          padding: "10px 16px",
          borderRadius: "8px",
          border: `2px solid ${colors.border}`,
          background: colors.background,
          color: colors.color,
          fontSize: "0.875rem",
          fontWeight: 500,
          minWidth: "120px",
          textAlign: "center",
        }}
      >
        {data.label}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
}

const NODE_TYPES = { topic: TopicNode };

function toFlowNodes(nodes: GraphData["nodes"]): Node[] {
  const cols = Math.ceil(Math.sqrt(nodes.length));
  return nodes.map((n, i) => ({
    id: n.id,
    type: "topic",
    position: { x: (i % cols) * 200, y: Math.floor(i / cols) * 120 },
    data: { label: n.label, status: n.status },
  }));
}

function toFlowEdges(edges: GraphData["edges"]): Edge[] {
  return edges.map((e) => ({
    id: e.id,
    source: e.source,
    target: e.target,
    label: e.label,
    type: "smoothstep",
    animated: false,
    style: { stroke: "#9e9e9e" },
    labelStyle: { fontSize: "0.75rem", fill: "#757575" },
  }));
}

export function KnowledgeGraph({ messages, onAnalyze }: Props) {
  const [graphData, setGraphData] = useState<GraphData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (messages.filter((m) => m.role !== "system").length === 0) return;
    setLoading(true);
    setError(null);
    try {
      const data = await onAnalyze(messages);
      setGraphData(data);
    } catch {
      setError("Could not analyze the conversation.");
    } finally {
      setLoading(false);
    }
  };

  const hasConversation = messages.some((m) => m.role === "user");

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", minHeight: 0 }}>
      <div
        style={{
          padding: "12px 16px",
          borderBottom: "1px solid var(--mui-palette-divider, #e0e0e0)",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          flexShrink: 0,
        }}
      >
        <span style={{ fontWeight: 600, fontSize: "0.9375rem", color: "var(--mui-palette-text-primary, #212121)" }}>
          Knowledge Graph
        </span>
        <button
          type="button"
          onClick={handleAnalyze}
          disabled={loading || !hasConversation}
          style={{
            padding: "6px 16px",
            borderRadius: "6px",
            border: "none",
            backgroundColor:
              loading || !hasConversation
                ? "var(--mui-palette-action-disabledBackground, #e0e0e0)"
                : "var(--mui-palette-primary-main, #1a237e)",
            color:
              loading || !hasConversation
                ? "var(--mui-palette-action-disabled, #9e9e9e)"
                : "var(--mui-palette-primary-contrastText, #fff)",
            fontSize: "0.875rem",
            fontWeight: 500,
            cursor: loading || !hasConversation ? "not-allowed" : "pointer",
            transition: "background-color 0.2s",
          }}
        >
          {loading ? "Analyzing…" : "Analyze progress"}
        </button>
        {error && (
          <span style={{ fontSize: "0.8125rem", color: "var(--mui-palette-error-main, #d32f2f)" }}>{error}</span>
        )}
        {graphData && <Legend />}
      </div>

      <div style={{ flex: 1, minHeight: 0 }}>
        {graphData && graphData.nodes.length > 0 ? (
          <ReactFlow
            nodes={toFlowNodes(graphData.nodes)}
            edges={toFlowEdges(graphData.edges)}
            nodeTypes={NODE_TYPES}
            fitView
            fitViewOptions={{ padding: 0.2 }}
          >
            <Background />
            <Controls />
          </ReactFlow>
        ) : (
          <div
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--mui-palette-text-secondary, #757575)",
              fontSize: "0.9375rem",
            }}
          >
            {hasConversation
              ? 'Click "Analyze progress" to map the conversation'
              : "Start the conversation to build a knowledge graph"}
          </div>
        )}
      </div>
    </div>
  );
}

function Legend() {
  return (
    <div style={{ display: "flex", gap: "12px", marginLeft: "auto", flexWrap: "wrap" }}>
      {(Object.entries(STATUS_COLORS) as [NodeStatus, (typeof STATUS_COLORS)[NodeStatus]][]).map(([status, colors]) => (
        <div key={status} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "3px",
              background: colors.background,
              border: `2px solid ${colors.border}`,
            }}
          />
          <span
            style={{
              fontSize: "0.75rem",
              color: "var(--mui-palette-text-secondary, #757575)",
              textTransform: "capitalize",
            }}
          >
            {status.replace("_", " ")}
          </span>
        </div>
      ))}
    </div>
  );
}

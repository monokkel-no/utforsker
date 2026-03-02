export type NodeStatus = "not_started" | "exploring" | "understood" | "mastered";

export interface GraphNode {
  id: string;
  label: string;
  status: NodeStatus;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

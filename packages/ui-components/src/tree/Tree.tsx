import { useState } from "react";

export interface TreeNode {
  name: string;
  path: string;
  type: "file" | "folder";
  children?: TreeNode[];
}

interface Props {
  nodes: TreeNode[];
  selectedPath?: string;
  onSelect: (path: string) => void;
  renderLabel?: (node: TreeNode) => React.ReactNode;
}

export function Tree({ nodes, selectedPath, onSelect, renderLabel }: Props) {
  return (
    <nav
      style={{
        height: "100%",
        overflowY: "auto",
        whiteSpace: "nowrap",
        padding: "8px 0",
        fontSize: "0.875rem",
      }}
    >
      {nodes.map((node) => (
        <TreeItem
          key={node.path}
          node={node}
          selectedPath={selectedPath}
          onSelect={onSelect}
          renderLabel={renderLabel}
          depth={0}
        />
      ))}
    </nav>
  );
}

function TreeItem({
  node,
  selectedPath,
  onSelect,
  renderLabel,
  depth,
}: {
  node: TreeNode;
  selectedPath?: string;
  onSelect: (path: string) => void;
  renderLabel?: (node: TreeNode) => React.ReactNode;
  depth: number;
}) {
  const [open, setOpen] = useState(true);
  const isSelected = node.path === selectedPath;
  const label = renderLabel ? renderLabel(node) : node.name;

  if (node.type === "folder") {
    return (
      <div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            width: "100%",
            padding: `4px 12px 4px ${12 + depth * 16}px`,
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--mui-palette-text-secondary, #616161)",
            fontWeight: 600,
            fontSize: "inherit",
            textAlign: "left",
          }}
        >
          <span style={{ fontSize: "0.625rem", display: "inline-block", width: "10px" }}>{open ? "▼" : "▶"}</span>
          {label}
        </button>
        {open &&
          node.children?.map((child) => (
            <TreeItem
              key={child.path}
              node={child}
              selectedPath={selectedPath}
              onSelect={onSelect}
              renderLabel={renderLabel}
              depth={depth + 1}
            />
          ))}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onSelect(node.path)}
      style={{
        display: "block",
        width: "100%",
        padding: `4px 12px 4px ${28 + depth * 16}px`,
        background: isSelected ? "var(--mui-palette-primary-main, #1a237e)" : "none",
        border: "none",
        cursor: "pointer",
        color: isSelected
          ? "var(--mui-palette-primary-contrastText, #fff)"
          : "var(--mui-palette-text-primary, #212121)",
        fontSize: "inherit",
        textAlign: "left",
        borderRadius: "4px",
      }}
    >
      {label}
    </button>
  );
}

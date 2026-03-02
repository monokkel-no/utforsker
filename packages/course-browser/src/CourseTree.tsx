import { Tree, type TreeNode } from "@repo/ui-components/tree";

export type { TreeNode };

/** Build a tree structure from a flat list of relative file paths (e.g. "trinn5/matte/foo.md") */
export function buildTree(filePaths: string[]): TreeNode[] {
  const root: TreeNode[] = [];

  for (const filePath of filePaths) {
    const parts = filePath.split("/");
    let level = root;

    for (let i = 0; i < parts.length; i++) {
      const name = parts[i] ?? "";
      const isFile = i === parts.length - 1;
      const path = parts.slice(0, i + 1).join("/");

      let node = level.find((n) => n.name === name);
      if (!node) {
        node = { name, path, type: isFile ? "file" : "folder", children: isFile ? undefined : [] };
        level.push(node);
      }

      if (!isFile) level = node.children ?? [];
    }
  }

  return root;
}

interface Props {
  files: string[];
  selectedPath?: string;
  onSelect: (path: string) => void;
}

export function CourseTree({ files, selectedPath, onSelect }: Props) {
  return <Tree nodes={buildTree(files)} selectedPath={selectedPath} onSelect={onSelect} />;
}

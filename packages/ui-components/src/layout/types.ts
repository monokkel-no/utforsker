import type { Size } from "@repo/ui-theme/types.js";

const semanticSizes = ["maxContentWidth"] as const;

export type SemanticSize = (typeof semanticSizes)[number];

export interface SizeProps {
  gap?: Size;
  rowGap?: Size;
  columnGap?: Size;
  minWidth?: Size;
  maxWidth?: Size | SemanticSize;
  margin?: Size | "auto";
  marginInline?: Size | "auto";
  marginBlock?: Size | "auto";
  marginInlineStart?: Size | "auto";
  marginInlineEnd?: Size | "auto";
  marginBlockStart?: Size | "auto";
  marginBlockEnd?: Size | "auto";
  padding?: Size;
  paddingInline?: Size;
  paddingBlock?: Size;
  paddingInlineStart?: Size;
  paddingInlineEnd?: Size;
  paddingBlockStart?: Size;
  paddingBlockEnd?: Size;
}

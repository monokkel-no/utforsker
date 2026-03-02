import type { CSSProperties, ElementType, ReactNode } from "react";

export interface GridAreaProps {
  as?: ElementType;
  area?: string;
  alignSelf?: CSSProperties["alignSelf"];
  justifySelf?: CSSProperties["justifySelf"];
  children: ReactNode;
}

export const GridArea = ({ as: Component = "div", area, alignSelf, justifySelf, children }: GridAreaProps) => (
  <Component style={{ gridArea: area, alignSelf, justifySelf }}>{children}</Component>
);

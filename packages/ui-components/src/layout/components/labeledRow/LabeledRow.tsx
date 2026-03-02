import type { ElementType, ReactNode } from "react";
import * as styles from "./labeledRow.css.js";

export interface LabeledRowProps {
  as?: ElementType;
  label: ReactNode;
  children: ReactNode;
}

export const LabeledRow = ({ as: Component = "div", label, children }: LabeledRowProps) => {
  return (
    <Component className={styles.root}>
      <div>{label}</div>
      <div>{children}</div>
    </Component>
  );
};

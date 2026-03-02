import type { ReactNode } from "react";
import * as styles from "./pageHeader.css";
import clsx from "clsx";

export interface PageHeaderProps {
  home?: ReactNode;
  menu?: ReactNode;
  tools?: ReactNode;
  borderBottom?: boolean;
}

export const PageHeader = ({ home, menu, tools, borderBottom = true }: PageHeaderProps) => {
  return (
    <div className={clsx(styles.root, borderBottom && styles.borderBottom)}>
      <div className={styles.grid}>
        <div className={styles.home}>{home}</div>
        <div className={styles.menu}>{menu}</div>
        <div className={styles.tools}>{tools}</div>
      </div>
    </div>
  );
};

import type { ReactNode } from "react";
import * as styles from "./pageContent.css";
import clsx from "clsx";

export interface PageContentProps {
  center?: boolean;
  padding?: boolean;
  children?: ReactNode;
}

export const PageContent = ({ center = false, padding = false, children }: PageContentProps) => {
  return (
    <div className={clsx(styles.root, padding && styles.padding)}>
      {center ? <Center>{children}</Center> : children}
    </div>
  );
};

const Center = ({ children }: { children?: ReactNode }) => {
  return <div className={styles.center}>{children}</div>;
};

import type { ReactNode } from "react";
import * as styles from "./pageLayout.css";

export interface PageLayoutProps {
  banner?: ReactNode;
  header?: ReactNode;
  content?: ReactNode;
}

export const PageLayout = ({ banner, header, content }: PageLayoutProps) => {
  return (
    <div className={styles.root}>
      <div>
        {banner}
        {header}
      </div>
      {content}
    </div>
  );
};

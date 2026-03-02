import type { ReactNode } from "react";
import * as styles from "./pageBanner.css";

export interface PageBannerProps {
  children?: ReactNode;
}

export const PageBanner = ({ children }: PageBannerProps) => {
  return <div className={styles.root}>{children}</div>;
};

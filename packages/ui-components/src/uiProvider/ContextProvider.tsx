import type { ReactNode } from "react";
import { UIContext, type UIContextProps } from "./UIContext";

interface Props extends UIContextProps {
  children?: ReactNode;
}

export const ContextProvider = ({ children }: Props) => {
  const value: UIContextProps = {};
  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

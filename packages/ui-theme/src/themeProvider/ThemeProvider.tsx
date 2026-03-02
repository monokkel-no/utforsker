import type { ReactNode } from "react";
import type { Mode } from "../types.js";
import { ContextProvider } from "./ContextProvider.js";
import { ThemeContext } from "./ThemeContext.js";
import "../../dest/css-variables.css";
import "@fontsource-variable/roboto-flex/full.css";

interface Props {
  defaultMode?: Mode;
  children: ReactNode;
}

export const ThemeProvider = ({ defaultMode = "system", children }: Props) => (
  <ContextProvider defaultMode={defaultMode}>
    <ThemeContext.Consumer>{({ theme }) => <div className={theme.className}>{children}</div>}</ThemeContext.Consumer>
  </ContextProvider>
);

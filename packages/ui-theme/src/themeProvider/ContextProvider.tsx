import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useMediaQuery } from "../hooks/useMediaQuery.js";
import { darkTheme, lightTheme } from "../theme.js";
import type { Mode } from "../types.js";
import { ThemeContext, type ThemeContextProps } from "./ThemeContext.js";

interface Props {
  defaultMode: Mode;
  children?: ReactNode;
}

export const ContextProvider = ({ defaultMode, children }: Props) => {
  const { mode, setMode } = useMode(defaultMode);
  const theme = useTheme(mode);
  const value: ThemeContextProps = {
    theme,
    mode,
    setMode,
  };
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

const useMode = (defaultMode: Mode) => {
  const [mode, setMode] = useState<Mode>(defaultMode);
  return { mode, setMode };
};

const useTheme = (mode: Mode) => {
  const prefersDark = useDark(mode);
  const [theme, setTheme] = useState(lightTheme);
  useEffect(() => {
    setTheme(prefersDark ? darkTheme : lightTheme);
  }, [prefersDark]);
  return theme;
};

const useDark = (mode: Mode) => {
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
  return mode === "system" ? prefersDark : mode === "dark";
};

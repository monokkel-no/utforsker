import { createContext } from "react";
import type { Theme } from "../theme.js";
import type { Mode } from "../types.js";

export type ThemeContextProps = {
  theme: Theme;
  mode?: Mode;
  setMode: (mode: Mode) => void;
};

const defaults: ThemeContextProps = {
  theme: {} as Theme,
  setMode: () => undefined,
};

export const ThemeContext = createContext<ThemeContextProps>(defaults);

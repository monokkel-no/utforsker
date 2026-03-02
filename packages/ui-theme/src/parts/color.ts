import { darken, lighten, textColor } from "colorizr";
import { useContext } from "react";
import { ThemeContext } from "../themeProvider/ThemeContext.js";
import type { ColorName, Palette, PaletteColor } from "../types.js";

export const getPaletteColor = (color: string): PaletteColor => {
  return {
    main: color,
    light: lighten(color, 10),
    dark: darken(color, 10),
    contrastText: textColor(color),
  };
};

export const getPaletteColorByName = (name: ColorName, palette: Palette): PaletteColor | undefined => {
  const [key] = name.split(":");
  const item = palette[key as keyof Palette];
  return isPaletteColor(item) ? item : undefined;
};

export const getColorByName = (name: ColorName, palette: Palette) => {
  const [key, variant] = name.split(":");
  const object = palette[key as keyof Palette];
  if (typeof object === "string") {
    return object;
  }
  if (variant) {
    return object[variant as keyof PaletteColor];
  }
};

export const useColorByName = (name: ColorName) => {
  const { theme } = useContext(ThemeContext);
  return getColorByName(name, theme.palette);
};

export const isPaletteColor = (color: unknown): color is PaletteColor => {
  return (
    typeof color === "object" &&
    color !== null &&
    "main" in color &&
    "light" in color &&
    "dark" in color &&
    "contrastText" in color
  );
};

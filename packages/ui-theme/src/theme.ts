import { rotate } from "colorizr";
import { getPaletteColor } from "./parts/color.js";
import { pageLayout } from "./parts/pageLayout.js";
import { shape } from "./parts/shape.js";
import { size } from "./parts/size.js";
import { typography } from "./parts/typography.js";

export type Mode = "system" | "light" | "dark";

const primaryColor1 = "#1a237e";

const theme = {
  typography,
  size,
  pageLayout,
  shape,
  icon: {
    size: {
      small: 16,
      medium: 20,
    },
  },
};

const semanticPalette = {
  error: getPaletteColor("#f44336"),
  success: getPaletteColor("#16a34a"),

  disabled: {
    backgroundColor: "#ccc",
    color: "#888",
    borderColor: "#ccc",
  },

  statusNotStarted: getPaletteColor("#e0e0e0"),
  statusInProgress: getPaletteColor("#444"),
  statusComplete: getPaletteColor("#16a34a"),
};

export const lightTheme = {
  ...theme,
  className: "repo-light-theme",
  palette: {
    ...semanticPalette,
    primary: getPaletteColor(primaryColor1),
    secondary: getPaletteColor(rotate(primaryColor1, 240)),
    appBackground: getPaletteColor("#f4f4f4"),
    surfaceBackground: getPaletteColor("#fff"),
    divider: "#e0e0e0",
  },
  components: {
    appHeader: {
      backgroundColor: "#fff",
      textColor: "#000",
    },
  },
};

export type Theme = typeof lightTheme;

const primaryColor2 = "#fff";

export const darkTheme: Theme = {
  ...theme,
  className: "repo-dark-theme",
  palette: {
    ...semanticPalette,
    primary: getPaletteColor(primaryColor2),
    secondary: getPaletteColor(rotate(primaryColor2, 240)),
    appBackground: getPaletteColor("#000"),
    surfaceBackground: getPaletteColor("#222"),
    divider: "#222",
  },
  components: {
    appHeader: {
      backgroundColor: "#000",
      textColor: "#fff",
    },
  },
};

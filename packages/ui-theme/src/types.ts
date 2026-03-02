import type { size } from "./parts/size.js";
import type { typography } from "./parts/typography.js";

export type Mode = "system" | "light" | "dark";

export interface PaletteColor {
  main: string;
  light: string;
  dark: string;
  contrastText: string;
}

export interface Palette {
  primary: PaletteColor;
  secondary: PaletteColor;

  error: PaletteColor;
  success: PaletteColor;

  statusNotStarted: PaletteColor;
  statusInProgress: PaletteColor;
  statusComplete: PaletteColor;

  appBackground: PaletteColor;
  surfaceBackground: PaletteColor;
  divider: string;
}

type Flatten<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? {
              [SubK in keyof T[K]]: SubK extends "contrastText" ? never : `${K}:${SubK & string}`;
            }[keyof T[K]]
          : K
        : never;
    }[keyof T]
  : never;

export type ColorName = Flatten<Palette>;

export type TypographyVariant = keyof typeof typography;

export type Size = keyof typeof size;

// export type Theme = {
//   className: string;
//   typography: {
//     base: Typography;
//     button: Typography;
//     label: Typography;
//   };
//   palette: Palette;
//   size: {
//     [key: number]: string;
//   };
//   icon: {
//     size: {
//       small: number;
//       medium: number;
//       large: number;
//     };
//   };
//   components: {
//     appHeader: {
//       backgroundColor: string;
//       textColor: string;
//     };
//   };
// };

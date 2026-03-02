import { cssVariables } from "@repo/ui-theme/css-variables";
import { style } from "@vanilla-extract/css";

export const root = style({
  backgroundColor: cssVariables.palette.appBackground.main,
  color: cssVariables.palette.appBackground.contrastText,
});

export const padding = style({
  padding: cssVariables.size[16],
});

export const center = style({
  maxWidth: cssVariables.pageLayout.maxContentWidth,
  margin: "0 auto",
});

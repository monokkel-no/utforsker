import { cssVariables } from "@repo/ui-theme/css-variables";
import { style } from "@vanilla-extract/css";

export const root = style({
  padding: cssVariables.size[16],
  backgroundColor: cssVariables.palette.surfaceBackground.main,
  color: cssVariables.palette.surfaceBackground.contrastText,
});

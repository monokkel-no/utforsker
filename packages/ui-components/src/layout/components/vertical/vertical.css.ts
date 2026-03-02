import { cssVariables } from "@repo/ui-theme/css-variables";
import { style } from "@vanilla-extract/css";

export const root = style({
  display: "grid",
  gap: cssVariables.size[8],
});

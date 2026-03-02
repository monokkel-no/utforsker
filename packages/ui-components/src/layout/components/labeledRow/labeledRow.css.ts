import { cssVariables } from "@repo/ui-theme/css-variables";
import { style } from "@vanilla-extract/css";

export const root = style({
  display: "grid",
  gridTemplateColumns: `minmax(0, ${cssVariables.size[128]}) auto`,
  gap: cssVariables.size[4],
  alignItems: "center",
});

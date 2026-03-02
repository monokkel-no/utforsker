import { cssVariables } from "@repo/ui-theme/css-variables";
import { style } from "@vanilla-extract/css";

export const border = style({
  border: `1px solid ${cssVariables.palette.divider}`,
  borderRadius: "16px",
  backgroundColor: cssVariables.palette.surfaceBackground.main,
  transition: "border-color 0.2s ease-in-out",
  selectors: {
    "&:focus-within": {
      borderColor: cssVariables.palette.primary.main,
    },
  },
});

export const bottom = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "12px 14px 10px",
});

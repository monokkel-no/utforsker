import { cssVariables } from "@repo/ui-theme/css-variables";
import type { TypographyVariant } from "@repo/ui-theme/types.js";
import { style } from "@vanilla-extract/css";

export const styles = Object.entries(cssVariables.typography).map(
  ([variant, value]): { variant: TypographyVariant; className: string } => {
    return {
      variant: variant as TypographyVariant,
      className: style(value),
    };
  },
);

export const reset = style({
  margin: 0,
});

export const textWrapBalance = style({
  textWrap: "balance",
});

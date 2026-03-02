import type { TypographyVariant } from "@repo/ui-theme/types.js";
import clsx from "clsx";
import type { JSX, ReactNode } from "react";
import { styles, reset as resetClass, textWrapBalance } from "./typography.css";

interface Props {
  as?: keyof JSX.IntrinsicElements;
  variant: TypographyVariant;
  reset?: boolean;
  textWrap?: "balance";
  children: ReactNode;
}

export const Typography = ({ as = "div", variant, reset = true, textWrap, children }: Props) => {
  const className = styles.find((style) => style.variant === variant)?.className;
  const Component = as;
  return (
    <Component
      className={clsx({
        [resetClass]: reset,
        [className ?? ""]: true,
        [textWrapBalance]: textWrap === "balance",
      })}
    >
      {children}
    </Component>
  );
};

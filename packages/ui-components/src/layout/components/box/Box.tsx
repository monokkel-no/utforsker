import { renderThemeCssVariables } from "../../utils/renderThemeCssVariables.js";
import type { SizeProps } from "../../types.js";
import type { ElementType, ReactNode } from "react";

export interface BoxProps extends SizeProps {
  as?: ElementType;
  children?: ReactNode;
}

export const Box = ({ as: Component = "div", children, ...props }: BoxProps) => {
  return <Component style={renderThemeCssVariables(props)}>{children}</Component>;
};

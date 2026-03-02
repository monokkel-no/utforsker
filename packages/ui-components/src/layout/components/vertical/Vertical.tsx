import type { ElementType, ReactNode } from "react";
import * as styles from "./vertical.css.js";
import type { Properties } from "csstype";
import type { SizeProps } from "../../types.js";
import { renderThemeCssVariables } from "../../utils/renderThemeCssVariables.js";

type CssProps = Pick<Properties, "width" | "justifyItems" | "justifyContent" | "alignItems" | "alignContent"> &
  SizeProps;

export interface VerticalProps extends CssProps {
  as?: ElementType;
  children?: ReactNode;
}

export const Vertical = ({ as: Component = "div", children, ...props }: VerticalProps) => {
  return (
    <Component className={styles.root} style={renderThemeCssVariables(props)}>
      {children}
    </Component>
  );
};

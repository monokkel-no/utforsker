import type { Properties } from "csstype";
import type { ElementType, ReactNode } from "react";
import * as styles from "./grid.css.js";
import { renderThemeCssVariables } from "../../utils/renderThemeCssVariables.js";
import type { SizeProps } from "../../types.js";

type CssGridProps = Pick<
  Properties,
  | "width"
  | "height"
  | "gridTemplateColumns"
  | "gridTemplateRows"
  | "gridTemplateAreas"
  | "gridAutoFlow"
  | "gridAutoColumns"
  | "gridAutoRows"
  | "justifyItems"
  | "justifyContent"
  | "alignItems"
  | "alignContent"
  | "placeItems"
  | "placeContent"
  | "justifySelf"
  | "alignSelf"
  | "placeSelf"
> &
  SizeProps;

export interface GridProps extends CssGridProps {
  as?: ElementType;
  children?: ReactNode;
}

export const Grid = ({ as: Component = "div", children, ...props }: GridProps) => {
  return (
    <Component className={styles.root} style={renderThemeCssVariables(props)}>
      {children}
    </Component>
  );
};

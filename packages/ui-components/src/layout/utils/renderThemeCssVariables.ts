import { cssVariables } from "@repo/ui-theme/css-variables";
import type { Size } from "@repo/ui-theme/types.js";
import type { SemanticSize } from "../types.js";

type Props = Record<string, unknown>;

export const renderThemeCssVariables = (props: Props) => {
  const array = Object.entries(props)
    .map(renderCssProperty)
    .filter((item) => item !== undefined);
  return Object.assign({}, ...array);
};

const renderCssProperty = ([key, value]: [string, unknown]) => {
  return { [key]: getValue(value) };
};

const getValue = (value: unknown) => {
  if (typeof value === "number") {
    return getVariableOrPx(value);
  }
  if ((value as SemanticSize) === "maxContentWidth") {
    return cssVariables.pageLayout.maxContentWidth;
  }

  return value;
};

const getVariableOrPx = (size: number) => cssVariables.size[size as Size] ?? `${size}px`;

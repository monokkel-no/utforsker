import { cssVariables } from "@repo/ui-theme/css-variables";
import { style } from "@vanilla-extract/css";

export const root = style({
  padding: `${cssVariables.size[4]} ${cssVariables.size[16]}`,
  backgroundColor: cssVariables.components.appHeader.backgroundColor,
  color: cssVariables.components.appHeader.textColor,
});

export const borderBottom = style({
  borderBottom: `solid 1px ${cssVariables.palette.divider}`,
});

export const grid = style({
  display: "grid",
  gridTemplateColumns: "auto 1fr auto",
  gridTemplateAreas: '"home menu tools"',
  gap: cssVariables.size[4],
  alignItems: "center",
  maxWidth: cssVariables.pageLayout.maxContentWidth,
  minHeight: cssVariables.size[48],
  margin: "0 auto",
});

export const home = style({
  gridArea: "home",
});

export const menu = style({
  gridArea: "menu",
  display: "flex",
  gap: cssVariables.size[4],
  alignItems: "center",
});

export const tools = style({
  gridArea: "tools",
  display: "flex",
  gap: cssVariables.size[4],
  alignItems: "center",
});

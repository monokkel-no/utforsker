import { style, globalStyle } from "@vanilla-extract/css";

export const customIcon = style({});

globalStyle(`${customIcon} > svg`, {
  display: "block",
  width: "100%",
  height: "100%",
});

import { style } from "@vanilla-extract/css";

export const root = style({
  display: "grid",
  width: "100%",
  gridTemplateColumns: "100%",
  gridTemplateRows: "auto minmax(0, 1fr)",
  height: "100dvh",
});

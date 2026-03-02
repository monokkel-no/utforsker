import type { Properties } from "csstype";

const fontFamily = "'Roboto Flex Variable', 'sans-serif'";

const baseTypography: Properties = {
  fontFamily,
  fontWeight: 400,
  fontSize: "16px",
  lineHeight: 1.25,
};

function modularScale(step: number, base = 16, ratio = 1.25, lineHeightFactor = 1.25) {
  const fontSizePx = base * ratio ** step;
  const lineHeight = (Math.round(fontSizePx * lineHeightFactor) / fontSizePx).toFixed(2);
  return {
    fontSize: `${fontSizePx}px`,
    lineHeight: Number(lineHeight),
  };
}

export const typography = {
  base: baseTypography,
  h1: { fontFamily, fontWeight: 700, ...modularScale(5) },
  h2: { fontFamily, fontWeight: 600, ...modularScale(4) },
  h3: { fontFamily, fontWeight: 600, ...modularScale(3) },
  h4: { fontFamily, fontWeight: 500, ...modularScale(2) },
  h5: { fontFamily, fontWeight: 500, ...modularScale(1) },
  h6: { fontFamily, fontWeight: 500, ...modularScale(0) },
  paragraph: { fontFamily, fontWeight: 400, ...modularScale(0) },
  small: { fontFamily, fontSize: "14px", lineHeight: 1, fontWeight: 400 },
  input: { fontFamily, fontSize: "16px", lineHeight: 1.25, fontWeight: 400 },

  button: {
    fontFamily,
    fontSize: "14px",
    fontWeight: 500,
    lineHeight: 1.75,
  },
  label: {
    fontFamily,
    fontSize: "14px",
    fontWeight: 400,
  },
} as const satisfies Record<string, Properties>;

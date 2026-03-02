import { Separator as BaseSeparator } from "react-resizable-panels";

const separatorStyle: React.CSSProperties = {
  width: "5px",
  background: "var(--mui-palette-divider, #e0e0e0)",
  cursor: "col-resize",
  flexShrink: 0,
  transition: "background 0.15s",
};

export const Separator = () => {
  return <BaseSeparator style={separatorStyle} />;
};

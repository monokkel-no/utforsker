import type { IconButtonProps } from "@mui/material/IconButton";
import MuiIconButton from "@mui/material/IconButton";

export const IconButton = <C extends React.ElementType = "button">(props: IconButtonProps<C>) => {
  return <MuiIconButton {...props} />;
};

import type { ButtonProps } from "@mui/material/Button";
import MuiButton from "@mui/material/Button";

export const Button = <C extends React.ElementType = "button">(props: ButtonProps<C>) => {
  return <MuiButton {...props} />;
};

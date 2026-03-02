import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { darkTheme, lightTheme, type Theme } from "@repo/ui-theme/theme.js";
import { ThemeContext } from "@repo/ui-theme/themeProvider/ThemeContext.js";
import { type ReactNode, useContext } from "react";
import { UIContext, type UIContextProps } from "./UIContext";
import "modern-normalize/modern-normalize.css";

interface Props extends UIContextProps {
  children: ReactNode;
}

const createMuiTheme = (baseTheme: Theme) =>
  createTheme({
    typography: {
      fontFamily: baseTheme.typography.base.fontFamily,
    },
    shape: {
      borderRadius: 3,
    },
    palette: {
      primary: baseTheme.palette.primary,
      secondary: baseTheme.palette.secondary,
      error: baseTheme.palette.error,
      success: baseTheme.palette.success,
      background: {
        default: baseTheme.palette.appBackground.main,
        paper: baseTheme.palette.surfaceBackground.main,
      },
      text: {
        primary: baseTheme.palette.surfaceBackground.contrastText,
        secondary: baseTheme.palette.surfaceBackground.contrastText,
        disabled: baseTheme.palette.surfaceBackground.contrastText,
      },
      divider: baseTheme.palette.divider,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: baseTheme.typography.button,
        },
      },
    },
  });

const lightMuiTheme = createMuiTheme(lightTheme);

const darkMuiTheme = createMuiTheme(darkTheme);

export const UIProvider = ({ children, ...props }: Props) => {
  const { mode } = useContext(ThemeContext);
  const muiTheme = mode === "dark" ? darkMuiTheme : lightMuiTheme;

  const value: UIContextProps = {
    ...props,
  };
  return (
    <UIContext.Provider value={value}>
      <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>
    </UIContext.Provider>
  );
};

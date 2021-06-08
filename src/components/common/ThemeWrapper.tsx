import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import React, {createContext, ReactNode, useEffect, useMemo} from "react";
import CssBaseline from "@material-ui/core/CssBaseline";


const themeLight = createMuiTheme({
  palette: {
    background: {
      default: "#e4f0e2"
    }
  }
});

const themeDark = createMuiTheme({
  palette: {
    background: {
      default: "#222222"
    },
    text: {
      primary: "#ffffff"
    }
  }
});

interface ThemeContextI {
  lightMode: boolean;
  setLightMode: (lightMode: boolean) => void;
}

export const ThemeContext = createContext<ThemeContextI | null>(null);

export function ThemeWrapper(props: { children: ReactNode }) {
  const [lightMode, setLightMode] = React.useState(useMemo(() =>
    localStorage.getItem("lightMode") === "true", []));

  useEffect(() => {
    localStorage.setItem("lightMode", ""+lightMode);
  }, [lightMode]);

  return (
    <MuiThemeProvider theme={lightMode ? themeLight : themeDark}>
      <CssBaseline />
      {/*<Button onClick={() => setLightMode(prev => !prev)}>Toggle Theme</Button>*/}
      <ThemeContext.Provider value={{
        lightMode, setLightMode
      }}>
        {props.children}
      </ThemeContext.Provider>
    </MuiThemeProvider>
  );
}
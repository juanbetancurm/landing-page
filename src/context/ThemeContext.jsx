import { createContext, useContext } from "react";
import { useTheme } from "../hooks/useTheme";

export const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [theme, toggle] = useTheme();
  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);

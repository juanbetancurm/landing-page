import { useTheme } from "../hooks/useTheme";
import { ThemeContext } from "./themeContextValue";

export const ThemeProvider = ({ children }) => {
  const [theme, toggle] = useTheme();
  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

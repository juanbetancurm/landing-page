import { useContext } from "react";
import { ThemeContext } from "../context/themeContextValue";

export const useThemeContext = () => useContext(ThemeContext);

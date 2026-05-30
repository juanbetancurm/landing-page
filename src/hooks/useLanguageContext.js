import { useContext } from "react";
import { LanguageContext } from "../context/languageContextValue";

export const useLanguageContext = () => useContext(LanguageContext);

import { useLanguage } from "../hooks/useLanguage";
import { LanguageContext } from "./languageContextValue";

export const LanguageProvider = ({ children }) => {
  const languageValue = useLanguage();

  return (
    <LanguageContext.Provider value={languageValue}>
      {children}
    </LanguageContext.Provider>
  );
};

import { useEffect, useState } from "react";
import {
  defaultLanguage,
  isSupportedLanguage,
  languages,
  translate,
} from "../data/translations";

const LANGUAGE_STORAGE_KEY = "labolavs_language";

const getStoredLanguage = () => {
  try {
    const storedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return isSupportedLanguage(storedLanguage) ? storedLanguage : defaultLanguage;
  } catch {
    return defaultLanguage;
  }
};

const setStoredLanguage = (language) => {
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch {
    // Language switching should still work for the session if storage is blocked.
  }
};

export const useLanguage = () => {
  const [language, setLanguageState] = useState(getStoredLanguage);

  useEffect(() => {
    document.documentElement.lang = languages[language].htmlLang;
    document.title = translate(language, "document.title");
    setStoredLanguage(language);
  }, [language]);

  const setLanguage = (nextLanguage) => {
    if (!isSupportedLanguage(nextLanguage)) return;
    setLanguageState(nextLanguage);
  };

  const toggleLanguage = () => {
    setLanguageState((currentLanguage) =>
      currentLanguage === "en" ? "es" : "en"
    );
  };

  const t = (key, replacements) => translate(language, key, replacements);

  return { language, setLanguage, toggleLanguage, t };
};

import { languages } from "../data/translations";
import { useLanguageContext } from "../hooks/useLanguageContext";

const languageOptions = Object.keys(languages);

const LanguageToggle = () => {
  const { language, setLanguage, t } = useLanguageContext();

  return (
    <div className="language-toggle" role="group" aria-label={t("languageToggle.groupLabel")}>
      {languageOptions.map((option) => {
        const isSelected = option === language;
        const languageLabel = languages[option].label[language];

        return (
          <button
            key={option}
            type="button"
            className={`language-toggle-option ${isSelected ? "active" : ""}`}
            onClick={() => setLanguage(option)}
            aria-pressed={isSelected}
            aria-label={t(
              isSelected
                ? "languageToggle.selectedLabel"
                : "languageToggle.optionLabel",
              { language: languageLabel }
            )}
            title={languageLabel}
          >
            {languages[option].shortLabel}
          </button>
        );
      })}
    </div>
  );
};

export default LanguageToggle;

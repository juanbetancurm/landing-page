import { useState } from "react";
import { useLanguageContext } from "../hooks/useLanguageContext";

const AboutOlav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguageContext();

  return (
    <section className="about-section">
      <button
        className="about-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="about-toggle-icon">i</span>
        <span>{t("aboutOlav.title")}</span>
        <span className={`about-chevron ${isOpen ? "open" : ""}`}>v</span>
      </button>
      {isOpen && (
        <div className="about-content">
          <p>{t("aboutOlav.description")}</p>
        </div>
      )}
    </section>
  );
};

export default AboutOlav;

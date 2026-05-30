import { getLocalizedCategories } from "../data/projects";
import CategoryCard from "../components/CategoryCard";
import Footer from "../components/Footer";
import { useLanguageContext } from "../hooks/useLanguageContext";
import { useThemeContext } from "../hooks/useThemeContext";
import logoLight from "../assets/logo_l.png";
import logoDark from "../assets/logo_d.png"; // swap to logo-dark.png once added to src/assets/

const Home = () => {
  const { theme } = useThemeContext();
  const { language, t } = useLanguageContext();
  const categories = getLocalizedCategories(language);

  return (
    <div className="page home-page">
      <header className="hero" data-guide="hero">
        <div className="logo-placeholder">
          <img
            src={theme === "dark" ? logoDark : logoLight}
            alt={t("home.logoAlt")}
            className={`site-logo ${theme === "dark" ? "site-logo-dark" : "site-logo-light"}`}
          />
        </div>
        <h1 className="site-name">
          <span className="lab">Lab</span>
          <span className="olavs">Olavs</span>
        </h1>
        <p className="tagline">{t("home.tagline")}</p>
      </header>

      <main className="categories-section" data-guide="explore">
        <p className="section-label">{t("home.explore")}</p>
        <div className="categories-list">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;

import { categories } from "../data/projects";
import CategoryCard from "../components/CategoryCard";
import Footer from "../components/Footer";
import { useThemeContext } from "../context/ThemeContext";
import logoLight from "../assets/logo_l.png";
import logoDark from "../assets/logo_d.png"; // swap to logo-dark.png once added to src/assets/

const Home = () => {
  const { theme } = useThemeContext();

  return (
    <div className="page home-page">
      <header className="hero">
        <div className="logo-placeholder">
          <img
            src={theme === "dark" ? logoDark : logoLight}
            alt="LabOlavs Logo"
            className="site-logo"
          />
        </div>
        <h1 className="site-name">
          <span className="lab">Lab</span>
          <span className="olavs">Olavs</span>
        </h1>
        <p className="tagline">Learning tools for everyone</p>
      </header>

      <main className="categories-section">
        <p className="section-label">Explore</p>
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

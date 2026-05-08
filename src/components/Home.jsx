import { categories } from "../data/projects";
import CategoryCard from "../components/CategoryCard";
import AboutOlav from "../components/AboutOlav";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="page home-page">
      <header className="hero">
        <div className="logo-placeholder">
          <span>Logo</span>
        </div>
        <h1 className="site-name">LabOlavs</h1>
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

      <AboutOlav />
      <Footer />
    </div>
  );
};

export default Home;
import { categories } from "../data/projects";
import CategoryCard from "../components/CategoryCard";
import Footer from "../components/Footer";
import logo from "../assets/logo.png";

const Home = () => {
  return (
    <div className="page home-page">
      <header className="hero">
        <div className="logo-placeholder">
          <img src={logo} alt="LabOlavs Logo" className="site-logo" />
        </div>
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

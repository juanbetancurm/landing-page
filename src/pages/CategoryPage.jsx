import { useParams, Link } from "react-router-dom";
import { categories, projects } from "../data/projects";
import CategoryVisualIcon from "../components/CategoryVisualIcon";
import Footer from "../components/Footer";
import dnaIcon from "../assets/icons/dna_icon.png";
import mazeIcon from "../assets/icons/maze_icon.png";

const projectIcons = {
  dna: dnaIcon,
  maze: mazeIcon,
};

const CategoryPage = () => {
  const { categoryId } = useParams();
  const category = categories.find((cat) => cat.id === categoryId);

  if (!category) {
    return (
      <div className="page not-found-page">
        <h1>Category not found</h1>
        <Link to="/" className="back-link">
          Back to home
        </Link>
      </div>
    );
  }

  const categoryProjects = projects.filter(
    (project) => project.category === categoryId
  );
  const hasCustomCategoryIcon = Boolean(category.cardIcon);

  return (
    <div className="page category-page">
      <nav className="category-nav">
        <Link to="/" className="back-link">
          {"<"} Back to home
        </Link>
      </nav>

      <header className="category-header">
        <div
          className={`category-header-icon ${
            hasCustomCategoryIcon ? "category-icon-custom" : ""
          }`}
          style={{
            "--accent-color": category.color,
            "--accent-surface": category.bgColor,
          }}
        >
          <CategoryVisualIcon category={category} />
        </div>
        <div>
          <h1 className="category-title">{category.name}</h1>
          <p className="category-subtitle">{category.description}</p>
        </div>
      </header>

      <main className="projects-list">
        {categoryProjects.map((project) => (
          <a
            key={project.id}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card"
          >
            {projectIcons[project.icon] && (
              <div className="project-icon">
                <img
                  src={projectIcons[project.icon]}
                  alt=""
                  className="project-icon-image"
                  draggable="false"
                />
              </div>
            )}
            <div className="project-info">
              <h2 className="project-title">{project.title}</h2>
              <p className="project-description">{project.description}</p>
              <span className="project-status live">Live</span>
            </div>
            <span className="project-external-icon">{"->"}</span>
          </a>
        ))}

        {categoryProjects.length === 0 && (
          <div className="empty-category">
            <p>Coming soon</p>
            <p className="empty-subtitle">
              New {category.name.toLowerCase()} will appear here as they are
              deployed.
            </p>
          </div>
        )}

        {categoryProjects.length > 0 && (
          <div className="more-coming">
            <p>More {category.name.toLowerCase()} coming soon</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CategoryPage;

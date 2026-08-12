import { useParams, Link } from "react-router-dom";
import { getLocalizedCategories, getLocalizedProjects } from "../data/projects";
import CategoryVisualIcon from "../components/CategoryVisualIcon";
import ArrowIcon from "../components/ArrowIcon";
import Footer from "../components/Footer";
import { useLanguageContext } from "../hooks/useLanguageContext";
import dnaIcon from "../assets/icons/dna_icon.png";
import finMathIcon from "../assets/icons/fin_math.png";
import mazeIcon from "../assets/icons/maze_icon.png";

const projectIcons = {
  dna: dnaIcon,
  finMath: finMathIcon,
  maze: mazeIcon,
};

const CategoryPage = () => {
  const { categoryId } = useParams();
  const { language, t } = useLanguageContext();
  const categories = getLocalizedCategories(language);
  const projects = getLocalizedProjects(language);
  const category = categories.find((cat) => cat.id === categoryId);

  if (!category) {
    return (
      <div className="page not-found-page">
        <h1>{t("categoryPage.notFound")}</h1>
        <Link to="/" className="back-link">
          {t("categoryPage.backHome")}
        </Link>
      </div>
    );
  }

  const categoryProjects = projects.filter(
    (project) => project.category === categoryId
  );
  const hasCustomCategoryIcon = Boolean(category.cardIcon);
  const categoryNameLower = category.name.toLocaleLowerCase(language);

  return (
    <div className="page category-page">
      <nav className="category-nav">
        <Link to="/" className="back-link">
          <ArrowIcon direction="left" className="back-link-icon" />
          {t("categoryPage.backHome")}
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
              <span className="project-status live">
                {t("categoryPage.live")}
              </span>
            </div>
            <ArrowIcon direction="right" className="project-external-icon" />
          </a>
        ))}

        {categoryProjects.length === 0 && (
          <div className="empty-category">
            <p>{t("categoryPage.comingSoon")}</p>
            <p className="empty-subtitle">
              {t("categoryPage.emptyCategory", {
                category: categoryNameLower,
              })}
            </p>
          </div>
        )}

        {categoryProjects.length > 0 && (
          <div className="more-coming">
            <p>
              {t("categoryPage.moreComing", {
                category: categoryNameLower,
              })}
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CategoryPage;

import { Link } from "react-router-dom";
import CategoryVisualIcon from "./CategoryVisualIcon";

const CategoryCard = ({ category }) => {
  const hasCustomIcon = Boolean(category.cardIcon);

  return (
    <Link
      to={category.path}
      className="category-card"
      style={{
        "--accent-color": category.color,
        "--accent-surface": category.bgColor,
      }}
    >
      <div
        className={`category-icon ${hasCustomIcon ? "category-icon-custom" : ""}`}
      >
        <CategoryVisualIcon category={category} />
      </div>
      <div className="category-info">
        <h2 className="category-name">{category.name}</h2>
        <p className="category-description">{category.description}</p>
      </div>
      <span className="category-chevron">{">"}</span>
    </Link>
  );
};

export default CategoryCard;

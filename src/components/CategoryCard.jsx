import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {
  return (
    <Link
      to={category.path}
      className="category-card"
      style={{
        "--accent-color": category.color,
        "--accent-surface": category.bgColor,
      }}
    >
      <div className="category-icon">
        <span>{category.icon}</span>
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

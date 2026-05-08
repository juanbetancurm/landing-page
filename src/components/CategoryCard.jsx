import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {
  return (
    <Link
      to={category.path}
      className="category-card"
      style={{
        backgroundColor: category.bgColor,
        color: category.color,
      }}
    >
      <div
        className="category-icon"
        style={{ backgroundColor: `${category.color}20` }}
      >
        <span>{category.icon}</span>
      </div>
      <div className="category-info">
        <h2 className="category-name">{category.name}</h2>
        <p className="category-description">{category.description}</p>
      </div>
      <span className="category-chevron">›</span>
    </Link>
  );
};

export default CategoryCard;
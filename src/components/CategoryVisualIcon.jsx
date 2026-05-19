import appsIcon from "../assets/icons/apps_icon.png";
import educationIcon from "../assets/icons/education_icon.png";
import gamesIcon from "../assets/icons/games_icon.png";

const categoryIcons = {
  apps: appsIcon,
  education: educationIcon,
  games: gamesIcon,
};

const CategoryVisualIcon = ({ category }) => {
  const iconSrc = categoryIcons[category.cardIcon];

  if (!iconSrc) {
    return <span>{category.icon}</span>;
  }

  return (
    <img
      src={iconSrc}
      alt=""
      className="visual-icon-image"
      draggable="false"
    />
  );
};

export default CategoryVisualIcon;

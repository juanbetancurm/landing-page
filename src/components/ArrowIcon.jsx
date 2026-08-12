import openIcon from "../assets/icons/open_icon.png";

const ArrowIcon = ({ direction = "up", className = "" }) => (
  <span
    className={`arrow-icon arrow-icon-${direction} ${className}`.trim()}
    aria-hidden="true"
  >
    <img src={openIcon} alt="" draggable="false" />
  </span>
);

export default ArrowIcon;

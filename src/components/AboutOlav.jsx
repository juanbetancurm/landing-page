import { useState } from "react";

const AboutOlav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="about-section">
      <button
        className="about-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="about-toggle-icon">🐱</span>
        <span>About Olav</span>
        <span className={`about-chevron ${isOpen ? "open" : ""}`}>▾</span>
      </button>
      {isOpen && (
        <div className="about-content">
          <p>
            Software developer and educator building tools to help teachers,
            students, and the curious.
          </p>
        </div>
      )}
    </section>
  );
};

export default AboutOlav;
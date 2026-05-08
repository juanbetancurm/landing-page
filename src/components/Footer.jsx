import { useState } from "react";

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.49 0-.24-.01-1.05-.01-1.9-2.78.62-3.37-1.2-3.37-1.2-.46-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.56 2.35 1.11 2.92.85.09-.67.35-1.11.64-1.37-2.22-.26-4.55-1.14-4.55-5.08 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.27 2.75 1.05A9.3 9.3 0 0 1 12 6.84c.85 0 1.71.12 2.51.35 1.9-1.32 2.74-1.05 2.74-1.05.56 1.42.21 2.47.11 2.73.64.72 1.03 1.63 1.03 2.75 0 3.95-2.33 4.82-4.56 5.08.36.31.67.92.67 1.86 0 1.34-.01 2.42-.01 2.75 0 .27.18.59.69.49A10.16 10.16 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z"
      fill="currentColor"
    />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M6.94 8.5A1.56 1.56 0 1 0 6.9 5.4a1.56 1.56 0 0 0 .04 3.1ZM5.6 9.7h2.63V18H5.6V9.7Zm4.27 0h2.52v1.13h.03c.35-.66 1.21-1.35 2.49-1.35 2.66 0 3.15 1.8 3.15 4.13V18h-2.63v-3.91c0-.93-.02-2.13-1.26-2.13-1.26 0-1.46 1.01-1.46 2.06V18H9.87V9.7Z"
      fill="currentColor"
    />
  </svg>
);

const CvIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M7 3.5h7l4 4V19a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 19V5A1.5 1.5 0 0 1 7.5 3.5H7Zm6.5 1.9V8h2.6l-2.6-2.6ZM8.5 11h7v1.5h-7V11Zm0 3h7v1.5h-7V14Zm0-6h3v1.5h-3V8Z"
      fill="currentColor"
    />
  </svg>
);

const Footer = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <footer className="footer">
      <div className="footer-dropdown">
        <button
          className="footer-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
        >
          <span className="footer-toggle-badge">Connect</span>
          <span className="footer-toggle-copy">
            <strong>About Olav</strong>
            <span>
              Software developer and educator building tools to help teachers,
              students, and the curious. Open to view profile links.
            </span>
          </span>
          <span className="footer-toggle-hint">
            <span>Open</span>
            <span className={`footer-chevron ${isOpen ? "open" : ""}`}>v</span>
          </span>
        </button>

        <div className={`footer-panel ${isOpen ? "open" : "closed"}`}>
          <div className="footer-panel-inner">
            <p className="footer-legend">Find Olav around the web</p>
            <div className="footer-links">
              <a
                href="https://github.com/juanbetancurm"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <span className="footer-link-icon">
                  <GitHubIcon />
                </span>
                <span>GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/juanjbetancur852/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <span className="footer-link-icon">
                  <LinkedInIcon />
                </span>
                <span>LinkedIn</span>
              </a>
              <a
                href="https://juanbetancurm.github.io/cv2026/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="CV"
              >
                <span className="footer-link-icon">
                  <CvIcon />
                </span>
                <span>CV</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

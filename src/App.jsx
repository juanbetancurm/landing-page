import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/Home";
import CategoryPage from "./pages/CategoryPage";
import IntroGuide from "./components/IntroGuide";
import LanguageToggle from "./components/LanguageToggle";
import ThemeToggle from "./components/ThemeToggle";
import { LanguageProvider } from "./context/LanguageContext";
import { ThemeProvider } from "./context/ThemeContext";
import { useThemeContext } from "./hooks/useThemeContext";

const AppContent = () => {
  const { theme, toggle } = useThemeContext();
  const location = useLocation();

  return (
    <>
      <LanguageToggle />
      <div className="utility-controls">
        <ThemeToggle theme={theme} onToggle={toggle} />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:categoryId" element={<CategoryPage />} />
      </Routes>
      {location.pathname === "/" && <IntroGuide />}
    </>
  );
};

const App = () => (
  <BrowserRouter>
    <LanguageProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </LanguageProvider>
  </BrowserRouter>
);

export default App;

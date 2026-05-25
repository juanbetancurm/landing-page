import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/Home";
import CategoryPage from "./pages/CategoryPage";
import IntroGuide from "./components/IntroGuide";
import ThemeToggle from "./components/ThemeToggle";
import { ThemeProvider } from "./context/ThemeContext";
import { useThemeContext } from "./hooks/useThemeContext";

const AppContent = () => {
  const { theme, toggle } = useThemeContext();
  const location = useLocation();

  return (
    <>
      <ThemeToggle theme={theme} onToggle={toggle} />
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
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  </BrowserRouter>
);

export default App;

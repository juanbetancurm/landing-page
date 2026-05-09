import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import CategoryPage from "./pages/CategoryPage";
import ThemeToggle from "./components/ThemeToggle";
import { ThemeProvider, useThemeContext } from "./context/ThemeContext";

const AppContent = () => {
  const { theme, toggle } = useThemeContext();
  return (
    <>
      <ThemeToggle theme={theme} onToggle={toggle} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:categoryId" element={<CategoryPage />} />
      </Routes>
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

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import RecipeSearch from "./pages/RecipeSearch";
import RecipeDetails from "./pages/RecipeDetails";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Recipes", path: "/recipes" },
  { name: "Dashboard", path: "/dashboard" },
];

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Header links={navLinks} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipes" element={<RecipeSearch />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
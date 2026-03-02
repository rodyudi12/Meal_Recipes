import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { searchRecipesByName } from "../services/mealRecipesAPI";
import "./Home.css";
import "../components/RecipeCard.css";

const Home = () => {
  const navigate = useNavigate();
  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      const data = await searchRecipesByName("chicken");
      setFeaturedRecipes(data ? data.slice(0, 6) : []);
      setLoading(false);
    };

    fetchFeatured();
  }, []);

  return (
    <div className="home-page">

      <section className="hero-section">
        <h1>Discover & Plan Your Meals Smarter</h1>
        <button className="home-btn" onClick={() => navigate("/recipes")}>
          Browse Recipes
        </button>
      </section>

      <section className="featured-section">
        <h2>Featured Recipes</h2>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="recipe-grid">
            {featuredRecipes.map((recipe) => (
              <RecipeCard key={recipe.idMeal} recipe={recipe} />
            ))}
          </div>
        )}
      </section>

    </div>
  );
};

export default Home;
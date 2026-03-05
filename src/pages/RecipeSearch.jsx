import { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";
import LoadingSpinner from "../components/LoadingSpinner";
import {searchRecipesByName,searchRecipesByCategory} from "../services/mealRecipesAPI";
import "./RecipeSearch.css";
import "../components/RecipeCard.css";

const RecipeSearch = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    setLoading(true);
    setError("");

    try {
      let data = [];

      if (query.trim()) {
        data = await searchRecipesByName(query);
      }

      else if (category !== "All") {
        data = await searchRecipesByCategory(category);
      }

      else {
        const categories = ["Beef", "Chicken", "Dessert", "Seafood", "Vegetarian"];

        const results = await Promise.all(
          categories.map((cat) => searchRecipesByCategory(cat))
        );

        data = results.flat();

        data.sort((a, b) => a.strMeal.localeCompare(b.strMeal));
      }

      setRecipes(data || []);
    } catch (err) {
      setError("Failed to fetch recipes. Please try again.");
    }

    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchRecipes();
  };

  return (
    <div className="recipe-search-page">

      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search recipes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>All</option>
          <option>Vegetarian</option>
          <option>Chicken</option>
          <option>Beef</option>
          <option>Seafood</option>
          <option>Dessert</option>
        </select>

        <button type="submit">Search</button>
      </form>

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <p className="error">{error}</p>
      ) : recipes.length > 0 ? (
        <div className="recipe-grid">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.idMeal} recipe={recipe} />
          ))}
        </div>
      ) : (
        <p>No recipes found.</p>
      )}

    </div>
  );
};

export default RecipeSearch;
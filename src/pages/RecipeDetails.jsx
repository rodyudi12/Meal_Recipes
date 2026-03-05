import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRecipeById } from "../services/mealRecipesAPI";
import { useFavorites } from "../contexts/FavoritesContext";
import LoadingSpinner from "../components/LoadingSpinner";

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { favorites, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await getRecipeById(id);
        setRecipe(data);
      } catch (err) {
        setError("Failed to load recipe.");
      }

      setLoading(false);
    };

    fetchRecipe();
  }, [id]);

  const isFavorite = favorites.some(item => item.idMeal === recipe?.idMeal);

  const getIngredients = () => {
    const ingredients = [];
    if (!recipe) return ingredients;

    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];

      if (ingredient && ingredient.trim() !== "") {
        ingredients.push(`${measure || ""} ${ingredient}`);
      }
    }
    return ingredients;
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <p>{error}</p>;
  if (!recipe) return <p>Recipe not found.</p>;

  const ingredients = getIngredients();

  return (
    <div className="page recipe-details-page">
      <div className="recipe-image">
        <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      </div>

      <div className="recipe-header">
        <h1>{recipe.strMeal}</h1>
        <p>
          <strong>{recipe.strCategory}</strong> | {recipe.strArea}
        </p>
      </div>

      <div className="ingredients-section">
        <h2>Ingredients</h2>
        <ul>
          {ingredients.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="instructions-section">
        <h2>Instructions</h2>
        <ol>
          {recipe.strInstructions
            .split(/\.\s+/)
            .filter(step => step.trim() !== "")
            .map((step, index) => (
              <li key={index}>{step}.</li>
            ))}
        </ol>
      </div>

      <div className="save-section">
        {isFavorite ? (
          <button className="save-btn" onClick={() => removeFavorite(recipe.idMeal)}>
            Remove from Favorites
          </button>
        ) : (
          <button className="save-btn" onClick={() => addFavorite(recipe)}>
            Save to Favorites
          </button>
        )}
      </div>
    </div>
  );
};

export default RecipeDetails;
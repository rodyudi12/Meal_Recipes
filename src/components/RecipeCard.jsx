import { Link } from "react-router-dom";
import "./RecipeCard.css";

const RecipeCard = ({ recipe, onRemove }) => {
  return (
    <div className="recipe-card">
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <h3>{recipe.strMeal}</h3>
      <div className="recipe-card-buttons">
        <Link to={`/recipe/${recipe.idMeal}`}>
          <button className="view-btn">View</button>
        </Link>
        {onRemove && (
          <button className="remove-btn" onClick={() => onRemove(recipe.idMeal)}>
            Remove
          </button>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;
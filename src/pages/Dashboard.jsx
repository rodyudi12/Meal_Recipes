import { useNavigate } from "react-router-dom";
import { useFavorites } from "../contexts/FavoritesContext";
import RecipeCard from "../components/RecipeCard";
import "./Dashboard.css";

const Dashboard = () => {
  const { favorites, removeFavorite } = useFavorites();
  const navigate = useNavigate();

  return (
    <div className="dashboard-page">
      <h1>Welcome, User</h1>

      {favorites.length > 0 ? (
        <div className="recipe-grid">
          {favorites.map((recipe) => (
            <div key={recipe.idMeal} className="dashboard-recipe-card">
              <RecipeCard recipe={recipe} />

              <div className="dashboard-buttons">
                <button onClick={() => removeFavorite(recipe.idMeal)}>
                  Remove from Favorites
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No recipes saved yet.</p>
      )}
    </div>
  );
};

export default Dashboard;
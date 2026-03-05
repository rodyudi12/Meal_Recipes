import { useFavorites } from "../contexts/FavoritesContext";
import { useAuth } from "../contexts/AuthContext";
import RecipeCard from "../components/RecipeCard";
import "./Dashboard.css";

const AdminDashboard = () => {
  const { allFavorites } = useFavorites();
  const { user } = useAuth();

  if (user?.role !== "admin") {
    return <h2>Access Denied</h2>;
  }

  return (
    <div className="dashboard-page">
      <h1>Admin Dashboard</h1>

      {Object.keys(allFavorites).length === 0 ? (
        <p>No recipes saved by users yet.</p>
      ) : (
        Object.entries(allFavorites).map(([email, recipes]) => (
          <div key={email}>
            <h2>User: {email}</h2>

            {recipes.length > 0 ? (
              <div className="recipe-grid">
                {recipes.map((recipe) => (
                  <RecipeCard key={recipe.idMeal} recipe={recipe} />
                ))}
              </div>
            ) : (
              <p>No favorites saved.</p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default AdminDashboard;
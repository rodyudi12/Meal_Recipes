import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const { user } = useAuth();

  const [allFavorites, setAllFavorites] = useState(() => {
    const saved = localStorage.getItem("allFavorites");
    return saved ? JSON.parse(saved) : {};
  });

  // Get favorites for current user
  const favorites = user ? allFavorites[user.email] || [] : [];

  useEffect(() => {
    localStorage.setItem("allFavorites", JSON.stringify(allFavorites));
  }, [allFavorites]);

  const addFavorite = (recipe) => {
    if (!user) return;

    setAllFavorites((prev) => {
      const userFavs = prev[user.email] || [];

      if (userFavs.find((r) => r.idMeal === recipe.idMeal)) {
        return prev;
      }

      return {
        ...prev,
        [user.email]: [...userFavs, recipe],
      };
    });
  };

  const removeFavorite = (idMeal) => {
    if (!user) return;

    setAllFavorites((prev) => ({
      ...prev,
      [user.email]: prev[user.email].filter((r) => r.idMeal !== idMeal),
    }));
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, allFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
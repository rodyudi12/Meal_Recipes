import { createContext, useState, useContext } from "react";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (recipe) => {
    setFavorites((prev) => {
      if (prev.find((r) => r.idMeal === recipe.idMeal)) return prev;
      return [...prev, recipe];
    });
  };

  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((r) => r.idMeal !== id));
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
const BASE_URL = "https://www.themealdb.com/api/json/v1/1";


export const searchRecipesByName = async (name) => {
  try {
    const response = await fetch(`${BASE_URL}/search.php?s=${name}`);
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error("Error fetching recipes by name:", error);
    return [];
  }
};

export const searchRecipesByCategory = async (category) => {
  try {
    if (!category || category === "All") {
      const categories = ["Beef", "Chicken", "Dessert", "Seafood", "Vegetarian"];
      const allRecipes = [];

      for (const cat of categories) {
        const res = await fetch(`${BASE_URL}/filter.php?c=${cat}`);
        const data = await res.json();
        if (data.meals) allRecipes.push(...data.meals);
      }

      return allRecipes;
    }

    const response = await fetch(`${BASE_URL}/filter.php?c=${category}`);
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error("Error fetching recipes by category:", error);
    return [];
  }
};

export const getRecipeById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
    const data = await response.json();
    return data.meals ? data.meals[0] : null;
  } catch (error) {
    console.error("Error fetching recipe by ID:", error);
    return null;
  }
};

export const getRandomRecipes = async (count = 3) => {
  try {
    const recipes = [];
    for (let i = 0; i < count; i++) {
      const response = await fetch(`${BASE_URL}/random.php`);
      const data = await response.json();
      if (data.meals) recipes.push(data.meals[0]);
    }
    return recipes;
  } catch (error) {
    console.error("Error fetching random recipes:", error);
    return [];
  }
};
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import RecipeDetails from "../pages/RecipeDetails";
import { vi } from "vitest";

vi.mock("../services/mealRecipesAPI", () => {
  return {
    getRecipeById: vi.fn(() =>
      Promise.resolve({
        idMeal: "1",
        strMeal: "Chicken Curry",
        strCategory: "Chicken",
        strArea: "Indian",
        strInstructions: "Cook it well.",
        strMealThumb: "thumb.jpg",
      })
    ),
  };
});

vi.mock("../contexts/FavoritesContext", () => {
  return {
    useFavorites: () => ({
      favorites: [],
      addFavorite: vi.fn(),
      removeFavorite: vi.fn(),
    }),
  };
});

vi.mock("../components/LoadingSpinner", () => {
  return { default: () => <div>Loading...</div> };
});

describe("RecipeDetails Page", () => {
  it("renders recipe details", async () => {
    render(
      <MemoryRouter initialEntries={["/recipe/1"]}>
        <Routes>
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Chicken Curry")).toBeInTheDocument();
      expect(screen.getByText("Cook it well.")).toBeInTheDocument();
    });
  });
});
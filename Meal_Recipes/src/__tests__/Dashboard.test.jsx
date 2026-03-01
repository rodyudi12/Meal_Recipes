import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import { vi } from "vitest";

vi.mock("../contexts/FavoritesContext", () => {
  return {
    useFavorites: () => ({
      favorites: [{ idMeal: "1", strMeal: "Chicken Curry" }],
      removeFavorite: vi.fn(),
    }),
  };
});

vi.mock("../components/RecipeCard", () => {
  return {
    default: (props) => <div data-testid="recipe-card">{props.recipe.strMeal}</div>,
  };
});

describe("Dashboard Page", () => {
  it("renders favorite recipes", () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    expect(screen.getByTestId("recipe-card")).toHaveTextContent("Chicken Curry");
  });
});
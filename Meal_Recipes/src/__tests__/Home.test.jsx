import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import { vi } from "vitest";

vi.mock("../services/mealRecipesAPI", () => {
  return {
    searchRecipesByName: vi.fn(() =>
      Promise.resolve([
        { idMeal: "1", strMeal: "Chicken Curry", strMealThumb: "thumb.jpg" },
        { idMeal: "2", strMeal: "Grilled Chicken", strMealThumb: "thumb2.jpg" },
      ])
    ),
  };
});

vi.mock("../components/RecipeCard", () => {
  return {
    default: (props) => <div data-testid="recipe-card">{props.recipe.strMeal}</div>,
  };
});

vi.mock("../components/LoadingSpinner", () => {
  return { default: () => <div>Loading...</div> };
});

describe("Home Page", () => {
  it("renders featured recipes after loading", async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getAllByTestId("recipe-card").length).toBe(2);
      expect(screen.getByText("Chicken Curry")).toBeInTheDocument();
    });
  });
});
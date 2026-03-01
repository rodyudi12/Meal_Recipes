import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RecipeSearch from "../pages/RecipeSearch";
import { vi } from "vitest";

vi.mock("../services/mealRecipesAPI", () => {
  return {
    searchRecipesByName: vi.fn(() =>
      Promise.resolve([{ idMeal: "1", strMeal: "Pasta" }])
    ),
    searchRecipesByCategory: vi.fn(() =>
      Promise.resolve([{ idMeal: "2", strMeal: "Salad" }])
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

describe("RecipeSearch Page", () => {
  it("renders recipes after search", async () => {
    render(<RecipeSearch />);

    const input = screen.getByPlaceholderText("Search recipes...");
    fireEvent.change(input, { target: { value: "Pasta" } });

    const button = screen.getByText("Search");
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByTestId("recipe-card")).toHaveTextContent("Pasta");
    });
  });
});
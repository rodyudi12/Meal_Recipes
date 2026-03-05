import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Home from "../Home";
import { vi } from "vitest";
import { BrowserRouter } from "react-router-dom";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("../../services/mealRecipesAPI", () => ({
  searchRecipesByName: vi.fn(),
}));

import { searchRecipesByName } from "../../services/mealRecipesAPI";

vi.mock("../../components/RecipeCard", () => ({
  default: ({ recipe }) => <div data-testid="recipe-card">{recipe.strMeal}</div>,
}));

vi.mock("../../components/LoadingSpinner", () => ({
  default: () => <div data-testid="loading-spinner">Loading...</div>,
}));

describe("Home Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading spinner initially and then featured recipes", async () => {
    const mockData = [
      { idMeal: "1", strMeal: "Chicken Curry" },
      { idMeal: "2", strMeal: "Grilled Chicken" },
    ];
    searchRecipesByName.mockResolvedValue(mockData);

    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument();

      const recipeCards = screen.getAllByTestId("recipe-card");
      expect(recipeCards).toHaveLength(mockData.length);

      expect(recipeCards[0]).toHaveTextContent("Chicken Curry");
      expect(recipeCards[1]).toHaveTextContent("Grilled Chicken");
    });
  });

  it("navigates to /recipes when Browse Recipes button is clicked", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    const browseButton = screen.getByText("Browse Recipes");
    fireEvent.click(browseButton);

    expect(mockNavigate).toHaveBeenCalledWith("/recipes");
  });
});
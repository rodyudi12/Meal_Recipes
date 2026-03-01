import { render, screen, fireEvent } from "@testing-library/react";
import Dashboard from "../Dashboard";
import { vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { useFavorites } from "../../contexts/FavoritesContext.jsx";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("../../contexts/FavoritesContext.jsx", () => ({
  useFavorites: vi.fn(),
}));

vi.mock("../../components/RecipeCard", () => ({
  default: ({ recipe }) => <div data-testid="recipe-card">{recipe.strMeal}</div>,
}));

describe("Dashboard Page", () => {
  const mockRemoveFavorite = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows empty state if no favorites", () => {
    useFavorites.mockReturnValue({
      favorites: [],
      removeFavorite: mockRemoveFavorite,
    });

    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    expect(screen.getByText("No recipes saved yet.")).toBeInTheDocument();
  });

  it("renders favorite recipes if any and allows removing", () => {
    useFavorites.mockReturnValue({
      favorites: [
        { idMeal: "1", strMeal: "Chicken Curry" },
        { idMeal: "2", strMeal: "Grilled Chicken" },
      ],
      removeFavorite: mockRemoveFavorite,
    });

    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    const recipeCards = screen.getAllByTestId("recipe-card");
    expect(recipeCards).toHaveLength(2);
    expect(recipeCards[0]).toHaveTextContent("Chicken Curry");
    expect(recipeCards[1]).toHaveTextContent("Grilled Chicken");

    // Click remove button
    const removeButtons = screen.getAllByText("Remove from Favorites");
    fireEvent.click(removeButtons[0]);
    expect(mockRemoveFavorite).toHaveBeenCalledWith("1");

    fireEvent.click(removeButtons[1]);
    expect(mockRemoveFavorite).toHaveBeenCalledWith("2");
  });
});
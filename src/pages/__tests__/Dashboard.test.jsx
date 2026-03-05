import { render, screen, fireEvent } from "@testing-library/react";
import Dashboard from "../Dashboard";
import { vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { useFavorites } from "../../contexts/FavoritesContext.jsx";
import { useAuth } from "../../contexts/AuthContext.jsx";

// Mock react-router-dom useNavigate
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

vi.mock("../../contexts/AuthContext.jsx", () => ({
  useAuth: vi.fn(),
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
    useFavorites.mockReturnValue({ favorites: [], removeFavorite: mockRemoveFavorite });
    useAuth.mockReturnValue({ user: { name: "Alice" } });

    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    expect(screen.getByText("Welcome, Alice")).toBeInTheDocument();
    expect(screen.getByText("No recipes saved yet.")).toBeInTheDocument();
  });

  it("renders favorite recipes if any and allows removing", () => {
    const favoriteRecipes = [
      { idMeal: "1", strMeal: "Chicken Curry" },
      { idMeal: "2", strMeal: "Grilled Chicken" },
    ];

    useFavorites.mockReturnValue({ favorites: favoriteRecipes, removeFavorite: mockRemoveFavorite });
    useAuth.mockReturnValue({ user: { name: "Bob" } });

    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    const recipeCards = screen.getAllByTestId("recipe-card");
    expect(recipeCards).toHaveLength(2);
    expect(recipeCards[0]).toHaveTextContent("Chicken Curry");
    expect(recipeCards[1]).toHaveTextContent("Grilled Chicken");

    const removeButtons = screen.getAllByText("Remove from Favorites");
    fireEvent.click(removeButtons[0]);
    expect(mockRemoveFavorite).toHaveBeenCalledWith("1");

    fireEvent.click(removeButtons[1]);
    expect(mockRemoveFavorite).toHaveBeenCalledWith("2");
  });

  it("renders default user name if user is null", () => {
    useFavorites.mockReturnValue({ favorites: [], removeFavorite: mockRemoveFavorite });
    useAuth.mockReturnValue({ user: null });

    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    expect(screen.getByText("Welcome, User")).toBeInTheDocument();
  });
});
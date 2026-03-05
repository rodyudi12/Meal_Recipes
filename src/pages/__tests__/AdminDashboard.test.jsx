import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import AdminDashboard from "../AdminDashboard";
import { useFavorites } from "../../contexts/FavoritesContext";
import { useAuth } from "../../contexts/AuthContext";

vi.mock("../../contexts/FavoritesContext", () => ({
  useFavorites: vi.fn(),
}));

vi.mock("../../contexts/AuthContext", () => ({
  useAuth: vi.fn(),
}));

// Mock RecipeCard
vi.mock("../../components/RecipeCard", () => ({
  default: ({ recipe }) => <div data-testid="recipe-card">{recipe.strMeal}</div>,
}));

describe("AdminDashboard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows Access Denied for non-admin users", () => {
    useAuth.mockReturnValue({ user: { role: "user", email: "user@example.com" } });
    useFavorites.mockReturnValue({ allFavorites: {} });

    render(
      <BrowserRouter>
        <AdminDashboard />
      </BrowserRouter>
    );

    expect(screen.getByText("Access Denied")).toBeInTheDocument();
  });

  it("shows empty state when no favorites exist", () => {
    useAuth.mockReturnValue({ user: { role: "admin", email: "admin@example.com" } });
    useFavorites.mockReturnValue({ allFavorites: {} });

    render(
      <BrowserRouter>
        <AdminDashboard />
      </BrowserRouter>
    );

    expect(screen.getByText("Admin Dashboard")).toBeInTheDocument();
    expect(screen.getByText("No recipes saved by users yet.")).toBeInTheDocument();
  });

  it("renders favorites for multiple users", () => {
    useAuth.mockReturnValue({ user: { role: "admin", email: "admin@example.com" } });
    useFavorites.mockReturnValue({
      allFavorites: {
        "user1@example.com": [{ idMeal: "1", strMeal: "Pizza" }],
        "user2@example.com": [
          { idMeal: "2", strMeal: "Burger" },
          { idMeal: "3", strMeal: "Pasta" },
        ],
      },
    });

    render(
      <BrowserRouter>
        <AdminDashboard />
      </BrowserRouter>
    );

    expect(screen.getByText("Admin Dashboard")).toBeInTheDocument();

    expect(screen.getByText("User: user1@example.com")).toBeInTheDocument();
    expect(screen.getByText("User: user2@example.com")).toBeInTheDocument();

    const recipeCards = screen.getAllByTestId("recipe-card");
    expect(recipeCards).toHaveLength(3);
    expect(recipeCards[0]).toHaveTextContent("Pizza");
    expect(recipeCards[1]).toHaveTextContent("Burger");
    expect(recipeCards[2]).toHaveTextContent("Pasta");
  });

  it("shows 'No favorites saved.' if a user has no recipes", () => {
    useAuth.mockReturnValue({ user: { role: "admin", email: "admin@example.com" } });
    useFavorites.mockReturnValue({
      allFavorites: {
        "user1@example.com": [],
      },
    });

    render(
      <BrowserRouter>
        <AdminDashboard />
      </BrowserRouter>
    );

    expect(screen.getByText("User: user1@example.com")).toBeInTheDocument();
    expect(screen.getByText("No favorites saved.")).toBeInTheDocument();
  });
});
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import RecipeDetails from "../RecipeDetails";
import { vi } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockAddFavorite = vi.fn();
const mockRemoveFavorite = vi.fn();
vi.mock("../../contexts/FavoritesContext", () => ({
  useFavorites: vi.fn(),
}));
import { useFavorites } from "../../contexts/FavoritesContext";

vi.mock("../../services/mealRecipesAPI", () => ({
  getRecipeById: vi.fn(),
}));
import { getRecipeById } from "../../services/mealRecipesAPI";

vi.mock("../../components/LoadingSpinner", () => ({
  default: () => <div data-testid="loading-spinner">Loading...</div>,
}));

describe("RecipeDetails Page", () => {
  const mockRecipe = {
    idMeal: "1",
    strMeal: "Chicken Curry",
    strCategory: "Main",
    strArea: "Indian",
    strInstructions: "Cook it well.",
    strMealThumb: "image.jpg",
    strIngredient1: "Chicken",
    strMeasure1: "1 kg",
  };

  beforeEach(() => {
    vi.clearAllMocks();
    useFavorites.mockReturnValue({
      favorites: [],
      addFavorite: mockAddFavorite,
      removeFavorite: mockRemoveFavorite,
    });
  });

  it("shows loading spinner initially and then recipe details", async () => {
    getRecipeById.mockResolvedValue(mockRecipe);

    render(
      <MemoryRouter initialEntries={["/recipe/1"]}>
        <Routes>
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
      </MemoryRouter>
    );

    // Check loading spinner appears initially
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();

    // Wait for recipe to load
    await waitFor(() => {
      expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument();
    });

    // Check recipe title
    expect(screen.getByText("Chicken Curry")).toBeInTheDocument();

    // Check category and area separately to avoid multi-node issues
    expect(screen.getByText("Main")).toBeInTheDocument();
    expect(screen.getByText("| Indian")).toBeInTheDocument(); 

    // Check ingredients and instructions
    expect(screen.getByText("1 kg Chicken")).toBeInTheDocument();
    expect(screen.getByText("Cook it well.")).toBeInTheDocument();

    // Check image
    expect(screen.getByRole("img", { name: /chicken curry/i })).toHaveAttribute("src", "image.jpg");
  });

  it("calls addFavorite when Save to Favorites button is clicked", async () => {
    getRecipeById.mockResolvedValue(mockRecipe);

    render(
      <MemoryRouter initialEntries={["/recipe/1"]}>
        <Routes>
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for recipe to load
    await waitFor(() => {
      expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument();
    });

    const saveBtn = screen.getByText("Save to Favorites");
    fireEvent.click(saveBtn);

    expect(mockAddFavorite).toHaveBeenCalledWith(mockRecipe);
  });

  it("calls removeFavorite if recipe is already in favorites", async () => {
    // Override FavoritesContext to include this recipe
    useFavorites.mockReturnValue({
      favorites: [mockRecipe],
      addFavorite: mockAddFavorite,
      removeFavorite: mockRemoveFavorite,
    });

    getRecipeById.mockResolvedValue(mockRecipe);

    render(
      <MemoryRouter initialEntries={["/recipe/1"]}>
        <Routes>
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument();
    });

    const removeBtn = screen.getByText("Remove from Favorites");
    fireEvent.click(removeBtn);

    expect(mockRemoveFavorite).toHaveBeenCalledWith("1");
  });
});
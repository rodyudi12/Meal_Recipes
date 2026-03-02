import { describe, test, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import RecipeSearch from "../RecipeSearch";
import * as mealAPI from "../../services/mealRecipesAPI";
import { renderWithProviders } from "../../__tests__/test-utils.jsx";

vi.mock("../../components/RecipeCard", () => ({
  default: (props) => <div>{props.recipe.strMeal}</div>,
}));

describe("RecipeSearch Page", () => {
  test("renders recipes based on search", async () => {
    const mockRecipes = [
      { idMeal: "1", strMeal: "Pasta" },
      { idMeal: "2", strMeal: "Pizza" },
    ];

    vi.spyOn(mealAPI, "searchRecipesByName").mockResolvedValue(mockRecipes);

    renderWithProviders(<RecipeSearch />);

    const input = screen.getByPlaceholderText(/search recipes/i);
    fireEvent.change(input, { target: { value: "Pasta" } });
    fireEvent.submit(input);

    expect(await screen.findByText("Pasta")).toBeInTheDocument();
    expect(await screen.findByText("Pizza")).toBeInTheDocument();
  });
});
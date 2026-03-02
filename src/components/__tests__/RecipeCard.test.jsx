import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RecipeCard from "../RecipeCard";
import { vi } from "vitest";

describe("RecipeCard Component", () => {
  const mockRecipe = {
    idMeal: "1",
    strMeal: "Chicken Curry",
    strMealThumb: "image.jpg",
  };
  const mockOnRemove = vi.fn();

  it("renders recipe card with name and image", () => {
    render(
      <MemoryRouter>
        <RecipeCard recipe={mockRecipe} onRemove={mockOnRemove} />
      </MemoryRouter>
    );

    expect(screen.getByText("Chicken Curry")).toBeInTheDocument();

    const img = screen.getByRole("img", { name: /chicken curry/i });
    expect(img).toHaveAttribute("src", "image.jpg");
  });

  it("calls onRemove when remove button clicked", () => {
    render(
      <MemoryRouter>
        <RecipeCard recipe={mockRecipe} onRemove={mockOnRemove} />
      </MemoryRouter>
    );

    const removeBtn = screen.getByRole("button", { name: /remove/i });
    fireEvent.click(removeBtn);

    expect(mockOnRemove).toHaveBeenCalledWith("1");
  });
});
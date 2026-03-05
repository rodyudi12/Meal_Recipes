import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../Header";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

const mockLogout = vi.fn();
vi.mock("../../contexts/AuthContext", () => ({
  useAuth: vi.fn(),
}));
import { useAuth } from "../../contexts/AuthContext";

describe("Header Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders logo and nav links", () => {
    useAuth.mockReturnValue({ user: null, logout: mockLogout });

    const links = [
      { name: "Home", path: "/" },
      { name: "Recipes", path: "/recipes" },
    ];

    render(
      <MemoryRouter>
        <Header links={links} />
      </MemoryRouter>
    );

    expect(screen.getByAltText(/fastrecipes logo/i)).toBeInTheDocument();

    links.forEach((link) => {
      expect(screen.getByText(link.name)).toBeInTheDocument();
    });
  });

  it("shows login link when user is not logged in", () => {
    useAuth.mockReturnValue({ user: null, logout: mockLogout });

    render(
      <MemoryRouter>
        <Header links={[]} />
      </MemoryRouter>
    );

    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  it("shows logout button when user is logged in", () => {
    useAuth.mockReturnValue({ user: { name: "Alice", role: "user" }, logout: mockLogout });

    render(
      <MemoryRouter>
        <Header links={[]} />
      </MemoryRouter>
    );

    const logoutBtn = screen.getByRole("button", { name: /logout/i });
    expect(logoutBtn).toBeInTheDocument();

    fireEvent.click(logoutBtn);
    expect(mockLogout).toHaveBeenCalled();
  });

  it("shows admin dashboard link if user is admin", () => {
    useAuth.mockReturnValue({ user: { name: "Admin", role: "admin" }, logout: mockLogout });

    render(
      <MemoryRouter>
        <Header links={[]} />
      </MemoryRouter>
    );

    expect(screen.getByText(/admin dashboard/i)).toBeInTheDocument();
  });
});
// src/components/__tests__/ProtectedRoute.test.jsx
import { render, screen } from "@testing-library/react";
import ProtectedRoute from "../ProtectedRoutes";
import { vi } from "vitest";
import { MemoryRouter, Routes, Route } from "react-router-dom";

// Mock useAuth
vi.mock("../../contexts/AuthContext", () => ({
  useAuth: vi.fn(),
}));
import { useAuth } from "../../contexts/AuthContext";

describe("ProtectedRoute Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("redirects to /login if user is not logged in", () => {
    useAuth.mockReturnValue({ user: null });

    render(
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <div>Protected Content</div>
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/login page/i)).toBeInTheDocument();
  });

  it("redirects to / if user does not have required role", () => {
    useAuth.mockReturnValue({ user: { name: "Alice", role: "user" } });

    render(
      <MemoryRouter initialEntries={["/admin"]}>
        <Routes>
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <div>Admin Content</div>
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<div>Home Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/home page/i)).toBeInTheDocument();
  });

  it("renders children if user is logged in and no role is required", () => {
    useAuth.mockReturnValue({ user: { name: "Alice", role: "user" } });

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div>Protected Content</div>
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.getByText(/protected content/i)).toBeInTheDocument();
  });

  it("renders children if user has the required role", () => {
    useAuth.mockReturnValue({ user: { name: "Admin", role: "admin" } });

    render(
      <MemoryRouter>
        <ProtectedRoute requiredRole="admin">
          <div>Admin Content</div>
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.getByText(/admin content/i)).toBeInTheDocument();
  });
});
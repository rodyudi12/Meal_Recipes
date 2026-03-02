import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

export function renderWithProviders(ui, renderOptions = {}) {
  const Wrapper = ({ children }) => (
    <BrowserRouter>{children}</BrowserRouter>
  );
  return render(ui, { wrapper: Wrapper, ...renderOptions });
}
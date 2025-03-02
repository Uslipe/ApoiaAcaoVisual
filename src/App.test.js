import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

test("renders App component", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
  // Verifique se algum elemento específico está presente na tela
  const linkElement = screen.getByText(/Home/i);
  expect(linkElement).toBeInTheDocument();
});

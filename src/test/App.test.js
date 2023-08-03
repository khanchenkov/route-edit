import App from "../components/App";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// проверить:
// 1. 

describe("Test App.js", () => {
  test("Input testing", () => {
    render(<App />);
    const input = screen.getByTestId("search-input");
    expect(input).toBeInTheDocument();

    expect(screen.queryByTestId("search-input")).toContainHTML("");
    fireEvent.input(input, {
      target: { value: "Москва, метро Орехово" },
    });
    expect(screen.queryByTestId("search-input")).toContainHTML(
      "Москва, метро Орехово"
    );
  });
});

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import Tooltip from "./Tooltip";

describe("Tooltip", () => {
  it("renders its children correctly", () => {
    render(
      <Tooltip content="Tooltip message">
        <button>My Button</button>
      </Tooltip>
    );
    expect(screen.getByRole("button", { name: /my button/i })).toBeInTheDocument();
  });

  it('renders the tooltip content inside an element with role="tooltip"', () => {
    render(
      <Tooltip content="Tooltip message">
        <button>My Button</button>
      </Tooltip>
    );
    const tooltipElement = screen.getByRole("tooltip", { hidden: true });
    expect(tooltipElement).toBeInTheDocument();
    expect(tooltipElement).toHaveTextContent("Tooltip message");
  });

  it("accepts a React node as content", () => {
    const tooltipContent = (
      <span>
        A <strong>bold</strong> message
      </span>
    );
    render(
      <Tooltip content={tooltipContent}>
        <button>My Button</button>
      </Tooltip>
    );
    const tooltipElement = screen.getByRole("tooltip", { hidden: true });
    expect(tooltipElement.querySelector("strong")).toHaveTextContent("bold");
  });
});

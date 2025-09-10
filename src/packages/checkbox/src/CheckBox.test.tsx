import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import Checkbox from "./CheckBox";

describe("Checkbox", () => {
  it("renders correctly with a label", () => {
    render(<Checkbox label="My Checkbox" />);
    expect(screen.getByLabelText("My Checkbox")).toBeInTheDocument();
  });

  it("is unchecked by default (uncontrolled)", () => {
    render(<Checkbox label="My Checkbox" />);
    expect(screen.getByLabelText("My Checkbox")).not.toBeChecked();
  });

  it("is checked when defaultChecked is true (uncontrolled)", () => {
    render(<Checkbox label="My Checkbox" defaultChecked />);
    expect(screen.getByLabelText("My Checkbox")).toBeChecked();
  });

  it("toggles its state when clicked (uncontrolled)", () => {
    render(<Checkbox label="My Checkbox" defaultChecked />);
    const checkbox = screen.getByLabelText("My Checkbox");
    expect(checkbox).toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it("calls onChange when its state changes", () => {
    const handleChange = vi.fn();
    render(<Checkbox label="My Checkbox" onChange={handleChange} />);
    const checkbox = screen.getByLabelText("My Checkbox");

    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(true, expect.any(Object));
  });

  it("respects the controlled checked prop", () => {
    const { rerender } = render(<Checkbox label="Controlled" checked={false} />);
    const checkbox = screen.getByLabelText("Controlled");
    expect(checkbox).not.toBeChecked();

    rerender(<Checkbox label="Controlled" checked={true} />);
    expect(checkbox).toBeChecked();
  });

  it("does not change state when disabled", () => {
    render(<Checkbox label="Disabled" disabled defaultChecked />);
    const checkbox = screen.getByLabelText("Disabled");
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it("does not change state when readOnly", () => {
    render(<Checkbox label="Read Only" readOnly defaultChecked />);
    const checkbox = screen.getByLabelText("Read Only");
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it("displays the indeterminate icon when indeterminate is true", () => {
    render(<Checkbox label="Indeterminate" indeterminate />);
    const checkbox = screen.getByLabelText("Indeterminate");
    expect(checkbox).toHaveAttribute("aria-checked", "mixed");
    expect(checkbox.nextElementSibling?.lastChild).not.toHaveClass("ubmisg-hidden");
  });

  it("associates the label with the input using htmlFor and id", () => {
    render(<Checkbox label="Accessible" id="acc-checkbox" />);
    const checkbox = screen.getByLabelText("Accessible");
    expect(checkbox.closest("label")).toHaveAttribute("for", "acc-checkbox");
  });

  it("applies screen-reader only styles when visuallyHiddenLabel is true", () => {
    render(<Checkbox label="Hidden" visuallyHiddenLabel />);
    expect(screen.getByText("Hidden")).toHaveClass("ubmisg-sr-only");
  });

  it("applies custom className and style props", () => {
    render(<Checkbox label="Custom" className="my-class" style={{ color: "red" }} />);
    const labelElement = screen.getByText("Custom").closest("label");
    expect(labelElement).toHaveClass("my-class");
    expect(labelElement).toHaveStyle("color: rgb(255, 0, 0)");
  });
  it("renders without a tooltip wrapper when tooltip prop is absent", () => {
    render(<Checkbox label="No Tooltip" />);
    const tooltipElement = screen.queryByRole("tooltip");
    expect(tooltipElement).toBeNull();
  });
  it("renders without a tooltip wrapper when tooltip prop is not provided", () => {
    render(<Checkbox label="No Tooltip" />);
    const tooltipElement = screen.queryByRole("tooltip");
    expect(tooltipElement).toBeNull();
  });
});

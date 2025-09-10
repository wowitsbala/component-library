import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { CheckboxGroup } from "./CheckboxGroup";
import Checkbox from "./CheckBox";

describe("CheckboxGroup", () => {
  it("renders a label and children correctly", () => {
    render(
      <CheckboxGroup label="My Group">
        <Checkbox value="a" label="Option A" />
      </CheckboxGroup>
    );
    expect(screen.getByText("My Group")).toBeInTheDocument();
    expect(screen.getByLabelText("Option A")).toBeInTheDocument();
  });

  it("handles uncontrolled state with defaultValue", () => {
    render(
      <CheckboxGroup label="My Group" defaultValue={["a"]}>
        <Checkbox value="a" label="Option A" />
        <Checkbox value="b" label="Option B" />
      </CheckboxGroup>
    );
    const checkboxA = screen.getByLabelText("Option A");
    const checkboxB = screen.getByLabelText("Option B");

    expect(checkboxA).toBeChecked();
    expect(checkboxB).not.toBeChecked();

    fireEvent.click(checkboxB);
    expect(checkboxB).toBeChecked();
    fireEvent.click(checkboxA);
    expect(checkboxA).not.toBeChecked();
  });

  it("handles controlled state with value and onChange", () => {
    const handleChange = vi.fn();
    const { rerender } = render(
      <CheckboxGroup label="My Group" value={["a"]} onChange={handleChange}>
        <Checkbox value="a" label="Option A" />
        <Checkbox value="b" label="Option B" />
      </CheckboxGroup>
    );

    const checkboxB = screen.getByLabelText("Option B");
    expect(checkboxB).not.toBeChecked();

    fireEvent.click(checkboxB);
    expect(handleChange).toHaveBeenCalledWith(["a", "b"]);
    expect(checkboxB).not.toBeChecked();

    rerender(
      <CheckboxGroup label="My Group" value={["a", "b"]} onChange={handleChange}>
        <Checkbox value="a" label="Option A" />
        <Checkbox value="b" label="Option B" />
      </CheckboxGroup>
    );
    expect(screen.getByLabelText("Option B")).toBeChecked();
  });

  it("propagates shared props like disabled and status to children", () => {
    render(
      <CheckboxGroup label="My Group" disabled status="error">
        <Checkbox value="a" label="Option A" />
      </CheckboxGroup>
    );
    const checkbox = screen.getByLabelText("Option A");
    const indicator = checkbox.nextElementSibling;

    expect(checkbox).toBeDisabled();
    expect(indicator).toHaveClass("ubmisg-border-red-300");
  });
});

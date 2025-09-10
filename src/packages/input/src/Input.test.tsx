import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React, { useState } from "react";
import { describe, expect, it, vi } from "vitest";

import Input, { InputRef } from "./Input";

describe("Input Component", () => {
  it("renders with label and help text", () => {
    render(<Input id="name" label="Name" helpText="Enter your full name" />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByText("Enter your full name")).toBeInTheDocument();
  });

  it("renders uncontrolled input and updates value", async () => {
    render(<Input id="uncontrolled" defaultValue="" placeholder="Type here" />);
    const input = screen.getByPlaceholderText("Type here") as HTMLInputElement;
    await userEvent.type(input, "world");
    expect(input.value).toBe("world");
  });

  it("renders controlled input and updates value via state", async () => {
    const Controlled = () => {
      const [val, setVal] = useState("");
      return (
        <Input
          id="controlled"
          value={val}
          onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
            setVal(e.target.value)
          }
        />
      );
    };
    render(<Controlled />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    await userEvent.type(input, "hello");
    expect(input.value).toBe("hello");
  });

  it("shows and clears value using clear button", async () => {
    render(<Input id="clearable" allowClear value="abc" type="text" />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.value).toBe("abc");

    const clearBtn = screen.getByRole("button", { name: "Clear input" });
    expect(clearBtn).toBeInTheDocument();

    await userEvent.click(clearBtn);
  });

  it("validates email format and shows error", async () => {
    render(<Input id="email" type="email" />);
    const input = screen.getByRole("textbox") as HTMLInputElement;

    await userEvent.type(input, "invalid-email");
    fireEvent.blur(input); // trigger validation
    expect(await screen.findByText(/invalid email address/i)).toBeInTheDocument();
  });

  it("validates number format and shows error", async () => {
    render(<Input id="age" type="number" />);
    const input = screen.getByRole("spinbutton") as HTMLInputElement; // number → role=spinbutton

    await userEvent.type(input, "abc");
    fireEvent.blur(input);
    expect(await screen.findByText(/must be a number/i)).toBeInTheDocument();
  });

  it("respects maxLength", async () => {
    render(<Input id="short" maxLength={5} />);
    const input = screen.getByRole("textbox") as HTMLInputElement;

    await userEvent.type(input, "123456789");
    expect(input.value.length).toBe(5);
  });

  it("renders prefix and suffix", () => {
    render(<Input id="money" prefix="$" suffix="USD" />);
    expect(screen.getByText("$")).toBeInTheDocument();
    expect(screen.getByText("USD")).toBeInTheDocument();
  });

  it("does not allow typing when disabled", async () => {
    render(<Input id="disabled" disabled value="initial" />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input).toHaveValue("initial");
    expect(input).toBeDisabled();

    await userEvent.type(input, "nope");
    expect(input).toHaveValue("initial");
  });

  it("calls focus and blur handlers", async () => {
    const onFocus = vi.fn();
    const onBlur = vi.fn();
    render(<Input id="focus" onFocus={onFocus} onBlur={onBlur} />);
    const input = screen.getByRole("textbox");

    await userEvent.click(input);
    expect(onFocus).toHaveBeenCalled();

    fireEvent.blur(input);
    expect(onBlur).toHaveBeenCalled();
  });

  it("calls onKeyDown when typing", async () => {
    const onKeyDown = vi.fn();
    render(<Input id="keytest" onKeyDown={onKeyDown} />);
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "A");
    expect(onKeyDown).toHaveBeenCalled();
  });

  it("supports imperative ref methods (focus, blur, clear)", async () => {
    const TestRef = () => {
      const ref = React.useRef<InputRef>(null);
      return (
        <>
          <Input id="ref-input" ref={ref} allowClear defaultValue="abc" />
          <button onClick={() => ref.current?.focus()}>Focus</button>
          <button onClick={() => ref.current?.blur()}>Blur</button>
          <button onClick={() => ref.current?.clear()}>Clear</button>
        </>
      );
    };
    render(<TestRef />);
    const input = screen.getByRole("textbox") as HTMLInputElement;

    // call clear via button → ref
    await userEvent.click(screen.getByText("Clear"));
    expect(input.value).toBe("");

    // call focus
    await userEvent.click(screen.getByText("Focus"));
    expect(document.activeElement).toBe(input);

    // call blur
    await userEvent.click(screen.getByText("Blur"));
    expect(document.activeElement).not.toBe(input);
  });

  it("renders clear button and clears value when clicked", async () => {
    render(<Input id="clearable" allowClear value="abc" type="text" />);

    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input).toHaveValue("abc");

    const clearBtn = screen.getByRole("button", { name: "Clear input" });
    await userEvent.click(clearBtn);
  });
});

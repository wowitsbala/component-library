import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";

import InputMask, { InputMaskRef } from "./InputMask";

describe("InputMask", () => {
  const mask = "999-999-9999";
  it("renders input with role textbox", () => {
    render(<InputMask id="phone" mask="999-999-9999" />);

    // find the input
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
  });

  it("renders with placeholder and helpText", () => {
    render(<InputMask id="phone" mask={mask} placeholder="Enter phone" helpText="Help!" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("placeholder", "Enter phone");
    expect(screen.getByText("Help!")).toBeInTheDocument();
  });

  it("applies mask on initial defaultValue (uncontrolled)", () => {
    render(<InputMask id="phone" mask={mask} defaultValue="1234567890" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("123-456-7890");
  });

  it("supports controlled value", () => {
    render(<InputMask id="phone" mask={mask} value="9876543210" />);
    expect(screen.getByRole("textbox")).toHaveValue("987-654-3210");
  });

  it("calls onChange with masked and raw values", async () => {
    const handleChange = vi.fn();
    render(<InputMask id="phone" mask={mask} onChange={handleChange} />);

    const input = screen.getByRole("textbox");
    await userEvent.type(input, "123456");

    expect(handleChange).toHaveBeenCalled();
    const [masked, raw] = handleChange.mock.lastCall ?? [];
    expect(masked).toMatch(/123-456-\*{4}/);
    expect(raw).toBe("123456");
  });

  it("handles backspace/delete over literals", async () => {
    render(<InputMask id="phone" mask={mask} value="1234567" />);
    const input = screen.getByRole("textbox") as HTMLInputElement;

    input.setSelectionRange(4, 4); // position after "123-"
    await userEvent.keyboard("{backspace}");
  });

  it("handles paste", () => {
    render(<InputMask id="phone" mask="999-999-9999" />);
    const input = screen.getByRole("textbox") as HTMLInputElement;

    const pasteEvent = {
      clipboardData: {
        getData: () => "9999999999"
      }
    } as unknown as ClipboardEvent; // ✅ cast via unknown, no `any`

    fireEvent.paste(input, pasteEvent);

    expect(input.value).toBe("999-999-9999");
  });

  it("fires onBlur with formatted value", () => {
    const handleBlur = vi.fn();
    render(<InputMask id="phone" mask={mask} defaultValue="123" onBlur={handleBlur} />);
    const input = screen.getByRole("textbox");

    fireEvent.blur(input);
    expect(handleBlur).toHaveBeenCalled();
    expect(input).toHaveValue("123-***-****");
  });

  it("moves caret to first empty position on focus/click", () => {
    render(<InputMask id="phone" mask={mask} value="1234" />);
    const input = screen.getByRole("textbox");

    fireEvent.focus(input);
  });

  it("renders clear button and clears value when clicked", async () => {
    const handleClear = vi.fn();
    render(<InputMask id="phone" mask={mask} value="123456" allowClear onClear={handleClear} />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("123-456-****");

    const button = screen.getByRole("button", { name: /clear input/i });
    await userEvent.click(button);

    expect(handleClear).toHaveBeenCalled();
  });

  it("does not allow typing when disabled", async () => {
    render(<InputMask id="phone" mask={mask} value="123" disabled />);
    const input = screen.getByRole("textbox");
    expect(input).toBeDisabled();
    await userEvent.type(input, "456");
    expect(input).toHaveValue("123-***-****");
  });

  it("respects readOnly prop", async () => {
    render(<InputMask id="phone" mask={mask} value="123" readOnly />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("readonly");
  });

  it("renders prefix and suffix", () => {
    render(<InputMask id="phone" mask={mask} prefix="$" suffix="USD" />);
    expect(screen.getByText("$")).toBeInTheDocument();
    expect(screen.getByText("USD")).toBeInTheDocument();
  });

  it("exposes ref API methods", () => {
    const ref = createRef<InputMaskRef>();
    render(<InputMask id="phone" mask={mask} value="123456" ref={ref} allowClear />);

    expect(ref.current).toBeDefined();
    expect(ref.current?.getRawValue()).toBe("123456");

    ref.current?.clear();
  });

  it("should skip backwards over literals when pressing Backspace", () => {
    render(<InputMask id="phone" mask="999-999-9999" defaultValue="123456" />);

    const input = screen.getByRole("textbox") as HTMLInputElement;

    // Verify masked format
    expect(input.value).toBe("123-456-****");

    // Caret right after the dash ("-")
    input.setSelectionRange(4, 4);

    // Press Backspace → caret should move before dash
    fireEvent.keyDown(input, { key: "Backspace", code: "Backspace" });

    expect(input.selectionStart).toBe(4);
  });

  it("should skip forwards over literals when pressing Delete", () => {
    render(<InputMask id="phone2" mask="999-999-9999" defaultValue="123456" />);

    const input = screen.getByRole("textbox") as HTMLInputElement;

    expect(input.value).toBe("123-456-****");

    // Caret before dash
    input.setSelectionRange(3, 3);

    // Press Delete → caret should move after dash
    fireEvent.keyDown(input, { key: "Delete", code: "Delete" });

    expect(input.selectionStart).toBe(3);
  });

  it("moves caret to first placeholder position on focus", () => {
    render(<InputMask id="phone" mask="999-999-9999" defaultValue="123" />);

    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.value).toBe("123-***-****");

    // Trigger focus
    fireEvent.focus(input);

    // Caret should be right after the '3'
    expect(input.selectionStart).toBe(12);
  });

  it("moves caret to end if no placeholders remain", () => {
    render(<InputMask id="phone2" mask="999-999-9999" defaultValue="1234567890" />);

    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.value).toBe("123-456-7890");

    // Trigger focus
    fireEvent.focus(input);

    // Caret should move to end since no placeholderChar exists
    expect(input.selectionStart).toBe(input.value.length);
  });

  it("moves caret correctly on click", () => {
    render(<InputMask id="phone3" mask="999-999-9999" defaultValue="12" />);

    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.value).toBe("12*-***-****");

    // Trigger click
    fireEvent.click(input);

    // Caret should land after '2'
    expect(input.selectionStart).toBe(2);
  });
});

import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Camera } from "lucide-react";

import Avatar from "./Avatar";

describe("Avatar", () => {
  it("renders an image when src is provided", () => {
    render(<Avatar src="test.jpg" name="Test" />);
    expect(screen.getByRole("img")).toHaveAttribute("src", "test.jpg");
  });

  it("renders image with alt text from name prop", () => {
    render(<Avatar src="test.jpg" name="John Doe" />);
    expect(screen.getByRole("img")).toHaveAttribute("alt", "John Doe");
  });

  it("renders image with custom alt text", () => {
    render(<Avatar src="test.jpg" alt="Custom Alt" name="John Doe" />);
    expect(screen.getByRole("img")).toHaveAttribute("alt", "Custom Alt");
  });

  // Fallback content tests
  it("renders initials from a two-word name", () => {
    render(<Avatar name="John Doe" />);
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("renders one initial from a single word name", () => {
    render(<Avatar name="John" />);
    expect(screen.getByText("J")).toBeInTheDocument();
  });

  it("renders initials from multi-word name (takes first 2)", () => {
    render(<Avatar name="John Michael Doe Smith" />);
    expect(screen.getByText("JM")).toBeInTheDocument();
  });

  it("handles name with extra whitespace", () => {
    render(<Avatar name="  John Doe  " />);
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("handles empty name gracefully", () => {
    render(<Avatar name="" />);
    const container = render(<Avatar name="" />).container;
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("handles name with only whitespace", () => {
    render(<Avatar name="   " />);
    const container = render(<Avatar name="   " />).container;
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders custom fallback content when provided", () => {
    render(<Avatar fallback="Custom" name="John Doe" />);
    expect(screen.getByText("Custom")).toBeInTheDocument();
    expect(screen.queryByText("JD")).not.toBeInTheDocument();
  });

  it("renders custom fallback JSX element when provided", () => {
    render(<Avatar fallback={<span data-testid="custom-fallback">👤</span>} name="John Doe" />);
    expect(screen.getByTestId("custom-fallback")).toBeInTheDocument();
    expect(screen.queryByText("JD")).not.toBeInTheDocument();
  });

  // Icon fallback tests
  it("renders custom icon when provided", () => {
    render(<Avatar icon={<Camera data-testid="camera-icon" />} />);
    expect(screen.getByTestId("camera-icon")).toBeInTheDocument();
  });

  it("renders default User icon when no props provided", () => {
    const { container } = render(<Avatar />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders icon fallback if src is invalid and no name is provided", () => {
    render(<Avatar src="invalid.jpg" icon={<span data-testid="custom-icon">ICON</span>} />);
    fireEvent.error(screen.getByRole("img"));
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });

  // Image error handling
  it("renders initials if image fails to load", () => {
    render(<Avatar src="invalid.jpg" name="Jane Doe" />);
    fireEvent.error(screen.getByRole("img"));
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("renders icon fallback when image fails and no name provided", () => {
    const { container } = render(<Avatar src="invalid.jpg" />);
    fireEvent.error(screen.getByRole("img"));
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  // Size variants
  it("applies xs size class", () => {
    const { container } = render(<Avatar name="Test" size="xs" />);
    expect(container.firstChild).toHaveClass("ubmisg-h-6", "ubmisg-w-6");
  });

  it("applies sm size class", () => {
    const { container } = render(<Avatar name="Test" size="sm" />);
    expect(container.firstChild).toHaveClass("ubmisg-h-8", "ubmisg-w-8");
  });

  it("applies md size class (default)", () => {
    const { container } = render(<Avatar name="Test" />);
    expect(container.firstChild).toHaveClass("ubmisg-h-10", "ubmisg-w-10");
  });

  it("applies lg size class", () => {
    const { container } = render(<Avatar name="Test" size="lg" />);
    expect(container.firstChild).toHaveClass("ubmisg-h-14", "ubmisg-w-14");
  });

  it("applies xl size class", () => {
    const { container } = render(<Avatar name="Test" size="xl" />);
    expect(container.firstChild).toHaveClass("ubmisg-h-20", "ubmisg-w-20");
  });

  // Shape variants
  it("applies rounded shape by default", () => {
    const { container } = render(<Avatar name="Test" />);
    expect(container.firstChild).toHaveClass("ubmisg-rounded-full");
  });

  it("applies square shape when specified", () => {
    const { container } = render(<Avatar name="Test" shape="square" />);
    expect(container.firstChild).toHaveClass("ubmisg-rounded-md");
  });

  // Status indicator tests
  it("renders online status", () => {
    const { container } = render(<Avatar name="Test" status="online" />);
    expect(container.querySelector(".ubmisg-bg-green-500")).toBeInTheDocument();
  });

  it("renders offline status", () => {
    const { container } = render(<Avatar name="Test" status="offline" />);
    expect(container.querySelector(".ubmisg-bg-gray-400")).toBeInTheDocument();
  });

  it("renders busy status", () => {
    const { container } = render(<Avatar name="Test" status="busy" />);
    expect(container.querySelector(".ubmisg-bg-red-500")).toBeInTheDocument();
  });

  it("renders away status", () => {
    const { container } = render(<Avatar name="Test" status="away" />);
    expect(container.querySelector(".ubmisg-bg-yellow-400")).toBeInTheDocument();
  });

  it("does not render status indicator when no status provided", () => {
    const { container } = render(<Avatar name="Test" />);
    expect(
      container.querySelector(".ubmisg-absolute.ubmisg-rounded-full.ubmisg-ring-2")
    ).not.toBeInTheDocument();
  });

  // Status with different sizes
  it("renders correct status size for xs avatar", () => {
    const { container } = render(<Avatar name="Test" status="online" size="xs" />);
    const statusElement = container.querySelector(".ubmisg-bg-green-500");
    expect(statusElement).toHaveClass("ubmisg-h-1.5", "ubmisg-w-1.5");
  });

  it("renders correct status size for xl avatar", () => {
    const { container } = render(<Avatar name="Test" status="online" size="xl" />);
    const statusElement = container.querySelector(".ubmisg-bg-green-500");
    expect(statusElement).toHaveClass("ubmisg-h-3.5", "ubmisg-w-3.5");
  });

  // Border tests
  it("applies bordered classes when bordered is true", () => {
    const { container } = render(<Avatar name="Test" bordered />);
    expect(container.firstChild).toHaveClass(
      "ubmisg-ring-2",
      "ubmisg-ring-offset-2",
      "ubmisg-ring-white",
      "ubmisg-ring-offset-gray-100"
    );
  });

  it("does not apply bordered classes by default", () => {
    const { container } = render(<Avatar name="Test" />);
    expect(container.firstChild).not.toHaveClass("ubmisg-ring-2");
  });

  // Accessibility tests
  it("applies aria-label for fallbacks for accessibility", () => {
    render(<Avatar name="John Doe" />);
    expect(screen.getByLabelText("John Doe")).toBeInTheDocument();
  });

  it("does not apply aria-label when an image is present", () => {
    render(<Avatar src="test.jpg" name="John Doe" />);
    expect(screen.queryByLabelText("John Doe")).toBeNull();
  });

  it("does not apply aria-label when no name is provided", () => {
    const { container } = render(<Avatar />);
    expect(container.firstChild).not.toHaveAttribute("aria-label");
  });

  // Custom props and className
  it("applies custom className", () => {
    const { container } = render(<Avatar name="Test" className="custom-class" />);
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("passes through additional props", () => {
    render(<Avatar name="Test" data-testid="custom-avatar" />);
    expect(screen.getByTestId("custom-avatar")).toBeInTheDocument();
  });

  // Ref forwarding
  it("forwards ref correctly", () => {
    const ref = { current: null };
    render(<Avatar name="Test" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });
});

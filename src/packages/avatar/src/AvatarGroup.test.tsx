import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import Avatar from "./Avatar";
import AvatarGroup from "./AvatarGroup";

describe("AvatarGroup", () => {
  // Basic rendering
  it("renders all children when no max is set", () => {
    render(
      <AvatarGroup>
        <Avatar name="User 1" />
        <Avatar name="User 2" />
        <Avatar name="User 3" />
      </AvatarGroup>
    );
    expect(screen.getByText("U1")).toBeInTheDocument();
    expect(screen.getByText("U2")).toBeInTheDocument();
    expect(screen.getByText("U3")).toBeInTheDocument();
  });

  it("applies base flex classes", () => {
    const { container } = render(
      <AvatarGroup>
        <Avatar name="User 1" />
      </AvatarGroup>
    );
    expect(container.firstChild).toHaveClass("ubmisg-flex", "ubmisg-items-center");
  });

  // Max prop and +N indicator
  it("collapses extra avatars into a +N indicator", () => {
    render(
      <AvatarGroup max={2}>
        <Avatar name="User 1" />
        <Avatar name="User 2" />
        <Avatar name="User 3" />
      </AvatarGroup>
    );
    expect(screen.getByText("U1")).toBeInTheDocument();
    expect(screen.getByText("U2")).toBeInTheDocument();
    const hiddenCountIndicator = screen.getByText("+1");
    expect(hiddenCountIndicator).toBeInTheDocument();
  });

  it("shows +N for multiple hidden avatars", () => {
    render(
      <AvatarGroup max={1}>
        <Avatar name="User 1" />
        <Avatar name="User 2" />
        <Avatar name="User 3" />
        <Avatar name="User 4" />
      </AvatarGroup>
    );
    expect(screen.getByText("U1")).toBeInTheDocument();
    expect(screen.getByText("+3")).toBeInTheDocument();
  });

  it("does not render +N indicator if max is not exceeded", () => {
    render(
      <AvatarGroup max={3}>
        <Avatar name="User 1" />
        <Avatar name="User 2" />
      </AvatarGroup>
    );
    expect(screen.queryByText(/^\+/)).toBeNull();
  });

  it("does not render +N indicator when max equals total avatars", () => {
    render(
      <AvatarGroup max={2}>
        <Avatar name="User 1" />
        <Avatar name="User 2" />
      </AvatarGroup>
    );
    expect(screen.queryByText(/^\+/)).toBeNull();
  });

  // Size inheritance
  it("passes shared size to all children", () => {
    render(
      <AvatarGroup size="xl">
        <Avatar name="User 1" />
      </AvatarGroup>
    );
    expect(screen.getByText("U1").closest("span")).toHaveClass(
      "ubmisg-font-medium",
      "ubmisg-text-3xl"
    );
  });

  it("passes size to +N indicator", () => {
    render(
      <AvatarGroup size="lg" max={1}>
        <Avatar name="User 1" />
        <Avatar name="User 2" />
      </AvatarGroup>
    );
    expect(screen.getByText("+1").closest("span")).toHaveClass(
      "ubmisg-text-gray-600",
      "ubmisg-text-xl"
    );
  });

  it("allows individual avatar size to override group size", () => {
    render(
      <AvatarGroup size="sm">
        <Avatar name="User 1" size="xl" />
      </AvatarGroup>
    );
    expect(screen.getByText("U1").closest("span")).toHaveClass(
      "ubmisg-text-gray-600",
      "ubmisg-text-3xl"
    );
  });

  // Overlap functionality
  it("applies default overlap (8px) via inline styles", () => {
    render(
      <AvatarGroup>
        <Avatar name="User 1" />
        <Avatar name="User 2" />
      </AvatarGroup>
    );
    const avatar2 = screen.getByText("U2").closest("span");
    expect(avatar2).toBeTruthy();
  });

  it("applies custom overlap via inline styles", () => {
    render(
      <AvatarGroup overlap={16}>
        <Avatar name="User 1" />
        <Avatar name="User 2" />
      </AvatarGroup>
    );
    const avatar2 = screen.getByText("U2").closest("span");
    expect(avatar2).toBeTruthy();
  });

  it("applies zero overlap", () => {
    render(
      <AvatarGroup overlap={0}>
        <Avatar name="User 1" />
        <Avatar name="User 2" />
      </AvatarGroup>
    );
    const avatar2 = screen.getByText("U2").closest("span");
    expect(avatar2).toBeTruthy();
  });

  it("applies overlap to +N indicator", () => {
    render(
      <AvatarGroup overlap={12} max={1}>
        <Avatar name="User 1" />
        <Avatar name="User 2" />
      </AvatarGroup>
    );
    const plusIndicator = screen.getByText("+1").closest("span");
    expect(plusIndicator).toBeTruthy();
  });

  it("does not apply overlap to first avatar", () => {
    render(
      <AvatarGroup overlap={16}>
        <Avatar name="User 1" />
        <Avatar name="User 2" />
      </AvatarGroup>
    );
    const avatar1 = screen.getByText("U1").closest("span");
    expect(avatar1).not.toHaveStyle("margin-left: -16px");
  });

  // Spacing functionality
  it("applies spacing via gap style", () => {
    const { container } = render(
      <AvatarGroup spacing={4}>
        <Avatar name="User 1" />
        <Avatar name="User 2" />
      </AvatarGroup>
    );
    expect(container.firstChild).toHaveStyle("gap: 4px");
  });

  it("applies large spacing via gap style", () => {
    const { container } = render(
      <AvatarGroup spacing={12}>
        <Avatar name="User 1" />
        <Avatar name="User 2" />
      </AvatarGroup>
    );
    expect(container.firstChild).toHaveStyle("gap: 12px");
  });

  it("does not apply overlap when spacing is used", () => {
    render(
      <AvatarGroup spacing={4} overlap={16}>
        <Avatar name="User 1" />
        <Avatar name="User 2" />
      </AvatarGroup>
    );
    const avatar2 = screen.getByText("U2").closest("span");
    expect(avatar2).not.toHaveStyle("margin-left: -16px");
  });

  it("does not apply overlap to +N indicator when spacing is used", () => {
    render(
      <AvatarGroup spacing={4} max={1}>
        <Avatar name="User 1" />
        <Avatar name="User 2" />
      </AvatarGroup>
    );
    const plusIndicator = screen.getByText("+1").closest("span");
    expect(plusIndicator).not.toHaveStyle("margin-left: -8px");
  });

  it("applies zero spacing", () => {
    const { container } = render(
      <AvatarGroup spacing={0}>
        <Avatar name="User 1" />
        <Avatar name="User 2" />
      </AvatarGroup>
    );
    expect(container.firstChild).toHaveStyle("gap: 0px");
  });

  // Z-index stacking
  it("applies z-index classes for proper stacking", () => {
    render(
      <AvatarGroup>
        <Avatar name="User 1" />
        <Avatar name="User 2" />
        <Avatar name="User 3" />
      </AvatarGroup>
    );
    expect(screen.getByText("U1").closest("span")).toHaveClass("ubmisg-h-full");
    expect(screen.getByText("U2").closest("span")).toHaveClass("ubmisg-text-gray-600");
    expect(screen.getByText("U3").closest("span")).toHaveClass("ubmisg-text-base");
  });

  it("applies z-0 class to +N indicator", () => {
    render(
      <AvatarGroup max={1}>
        <Avatar name="User 1" />
        <Avatar name="User 2" />
      </AvatarGroup>
    );
    expect(screen.getByText("+1").closest("span")).toHaveClass("ubmisg-text-gray-600");
  });

  // Custom props and className
  it("applies custom className", () => {
    const { container } = render(
      <AvatarGroup className="custom-group-class">
        <Avatar name="User 1" />
      </AvatarGroup>
    );
    expect(container.firstChild).toHaveClass("custom-group-class");
  });

  it("passes through additional props", () => {
    render(
      <AvatarGroup data-testid="custom-group">
        <Avatar name="User 1" />
      </AvatarGroup>
    );
    expect(screen.getByTestId("custom-group")).toBeInTheDocument();
  });

  it("preserves existing child props", () => {
    render(
      <AvatarGroup>
        <Avatar name="User 1" className="existing-class" data-testid="existing-avatar" />
      </AvatarGroup>
    );
    const avatar = screen.getByTestId("existing-avatar");
    expect(avatar).toHaveClass("existing-class");
  });

  // Edge cases
  it("handles non-React element children gracefully", () => {
    render(
      <AvatarGroup>
        <Avatar name="User 1" />
        {"plain text"}
        <Avatar name="User 2" />
      </AvatarGroup>
    );
    expect(screen.getByText("U1")).toBeInTheDocument();
    expect(screen.getByText("plain text")).toBeInTheDocument();
    expect(screen.getByText("U2")).toBeInTheDocument();
  });

  it("handles empty children array", () => {
    const { container } = render(<AvatarGroup>{[]}</AvatarGroup>);
    expect(container.firstChild).toHaveClass("ubmisg-flex");
  });

  it("handles single child", () => {
    render(
      <AvatarGroup>
        <Avatar name="Single User" />
      </AvatarGroup>
    );
    expect(screen.getByText("SU")).toBeInTheDocument();
  });

  // Context functionality
  it("provides context to nested avatars", () => {
    render(
      <AvatarGroup size="lg">
        <div>
          <Avatar name="Nested User" />
        </div>
      </AvatarGroup>
    );
    expect(screen.getByText("NU").closest("span")).toHaveClass(
      "ubmisg-text-gray-600",
      "ubmisg-text-xl"
    );
  });
});

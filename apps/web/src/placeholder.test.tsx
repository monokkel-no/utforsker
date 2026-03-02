import { screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("placeholder", () => {
  it("renders text", () => {
    render(<div>Hello</div>);
    expect(screen.getByText("Hello")).toBeDefined();
  });
});

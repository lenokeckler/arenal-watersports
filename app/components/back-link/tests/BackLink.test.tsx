import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import BackLink from "../BackLink";
import {
  ARROW_BACK_GLYPH,
  BACK_HREF,
  BACK_LABEL,
  FOCUS_VISIBLE_CLASS,
  LINK_ROLE,
  TAP_TARGET_CLASS,
} from "./BackLink.constants";

const renderBackLink = () => {
  render(
    <BackLink
      href={BACK_HREF}
      label={BACK_LABEL}
    />
  );
  return screen.getByRole(LINK_ROLE, {
    name: new RegExp(BACK_LABEL),
  });
};

describe("BackLink", () => {
  it("points to the given href and shows the label", () => {
    const link = renderBackLink();

    expect(link).toHaveAttribute("href", BACK_HREF);
    expect(link).toHaveTextContent(BACK_LABEL);
  });

  it("shows the back arrow", () => {
    const link = renderBackLink();

    expect(link).toHaveTextContent(ARROW_BACK_GLYPH);
  });

  it("keeps a 56px tap target with a visible focus outline", () => {
    const link = renderBackLink();

    expect(link).toHaveClass(
      TAP_TARGET_CLASS,
      FOCUS_VISIBLE_CLASS
    );
  });
});

import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ARIA_ROLE } from "@/app/constants";
import BackLink from "../BackLink";
import { BACK_LINK_CLASS } from "../styles/BackLink.styles";
import {
  ARROW_BACK_GLYPH,
  BACK_HREF,
  BACK_LABEL,
} from "./BackLink.constants";

const renderBackLink = () => {
  render(
    <BackLink
      href={BACK_HREF}
      label={BACK_LABEL}
    />
  );
  return screen.getByRole(ARIA_ROLE.LINK, {
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

  it("applies the shared back link style", () => {
    const link = renderBackLink();

    expect(link).toHaveClass(BACK_LINK_CLASS);
  });
});

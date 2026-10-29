import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import ScreenHeading from "../ScreenHeading";
import {
  HEADER_LOGO_ALT,
  HEADER_TITLE,
  HEADER_TITLE_ID,
  HEADING_INSTRUCTION,
} from "./ScreenHeader.constants";
import { createScreenHeaderPage } from "./ScreenHeader.page";

const renderScreenHeading = () =>
  render(
    <ScreenHeading
      title={HEADER_TITLE}
      titleId={HEADER_TITLE_ID}
      logoAlt={HEADER_LOGO_ALT}
      instruction={HEADING_INSTRUCTION}
    />
  );

describe("ScreenHeading", () => {
  it("renders the header with the given title and id", () => {
    renderScreenHeading();

    expect(createScreenHeaderPage().getTitleId()).toBe(
      HEADER_TITLE_ID
    );
  });

  it("renders the instruction below the header", () => {
    renderScreenHeading();

    expect(
      screen.getByText(HEADING_INSTRUCTION)
    ).toBeVisible();
  });
});

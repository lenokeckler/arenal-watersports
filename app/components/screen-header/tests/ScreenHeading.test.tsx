import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import ScreenHeading from "../ScreenHeading";
import {
  HEADER_LOGO_ALT,
  HEADER_TITLE,
  HEADER_TITLE_ID,
  HEADING_INSTRUCTION,
  HEADING_INSTRUCTION_ID,
  ID_ATTRIBUTE,
} from "./ScreenHeader.constants";
import { createScreenHeaderPage } from "./ScreenHeader.page";

const renderScreenHeading = (instructionId?: string) =>
  render(
    <ScreenHeading
      title={HEADER_TITLE}
      titleId={HEADER_TITLE_ID}
      logoAlt={HEADER_LOGO_ALT}
      instruction={HEADING_INSTRUCTION}
      instructionId={instructionId}
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

  it("gives the instruction the id it receives", () => {
    renderScreenHeading(HEADING_INSTRUCTION_ID);

    expect(
      screen.getByText(HEADING_INSTRUCTION)
    ).toHaveAttribute(ID_ATTRIBUTE, HEADING_INSTRUCTION_ID);
  });
});

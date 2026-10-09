import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import ScreenHeader from "../ScreenHeader";
import {
  HEADER_LOGO_ALT,
  HEADER_TITLE,
  HEADER_TITLE_ID,
  ID_ATTRIBUTE,
} from "./ScreenHeader.constants";
import { createScreenHeaderPage } from "./ScreenHeader.page";

const renderScreenHeader = () =>
  render(
    <ScreenHeader
      title={HEADER_TITLE}
      titleId={HEADER_TITLE_ID}
      logoAlt={HEADER_LOGO_ALT}
    />
  );

describe("ScreenHeader", () => {
  it("renders the logo with the given alt text", () => {
    renderScreenHeader();

    expect(
      createScreenHeaderPage().getLogo()
    ).toBeInTheDocument();
  });

  it("renders the page title as the level one heading", () => {
    renderScreenHeader();

    expect(
      createScreenHeaderPage().getTitle()
    ).toBeInTheDocument();
  });

  it("gives the heading the given id", () => {
    renderScreenHeader();

    expect(
      createScreenHeaderPage().getTitle()
    ).toHaveAttribute(ID_ATTRIBUTE, HEADER_TITLE_ID);
  });
});

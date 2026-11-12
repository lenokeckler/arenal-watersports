import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import ScreenHeader from "../ScreenHeader";
import {
  HEADER_LOGO_ALT,
  HEADER_TITLE,
  HEADER_TITLE_ID,
  ARIA_HIDDEN_ATTRIBUTE,
  ARIA_HIDDEN_FALSE,
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

    expect(createScreenHeaderPage().getTitleId()).toBe(
      HEADER_TITLE_ID
    );
  });

  it("keeps the logo exposed to assistive technology", () => {
    renderScreenHeader();

    expect(
      createScreenHeaderPage().getLogo()
    ).toHaveAttribute(
      ARIA_HIDDEN_ATTRIBUTE,
      ARIA_HIDDEN_FALSE
    );
  });

  it("renders no logo when hasLogo is false and keeps the title", () => {
    render(
      <ScreenHeader
        title={HEADER_TITLE}
        titleId={HEADER_TITLE_ID}
        hasLogo={false}
      />
    );

    expect(
      createScreenHeaderPage().queryLogo()
    ).not.toBeInTheDocument();
    expect(createScreenHeaderPage().getTitleId()).toBe(
      HEADER_TITLE_ID
    );
  });
});

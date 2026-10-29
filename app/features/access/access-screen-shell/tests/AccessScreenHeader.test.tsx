import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import AccessScreenHeader from "../AccessScreenHeader";
import { ACCESS_SCREEN_TITLE_ID } from "../constants/AccessScreen.constants";
import { ID_ATTRIBUTE } from "./AccessScreenHeader.constants";
import { createAccessScreenHeaderPage } from "./AccessScreenHeader.page";

describe("AccessScreenHeader", () => {
  it("renders the logo with its Spanish alt text", () => {
    render(<AccessScreenHeader />);
    const page = createAccessScreenHeaderPage();

    expect(page.getLogo()).toBeInTheDocument();
  });

  it("renders the level one title carrying the screen title id", () => {
    render(<AccessScreenHeader />);
    const page = createAccessScreenHeaderPage();

    expect(page.getTitle()).toHaveAttribute(
      ID_ATTRIBUTE,
      ACCESS_SCREEN_TITLE_ID
    );
  });
});

import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import AccessScreenShell from "../AccessScreenShell";
import AccessScreenHeader from "../AccessScreenHeader";
import { ACCESS_SCREEN_TITLE_ID } from "../constants/AccessScreen.constants";
import { createAccessScreenCompositionPage } from "./AccessScreenComposition.page";
import { createAccessScreenHeaderPage } from "./AccessScreenHeader.page";

describe("AccessScreenShell with AccessScreenHeader", () => {
  it("names the card after the header title when given the screen title id", () => {
    render(
      <AccessScreenShell titleId={ACCESS_SCREEN_TITLE_ID}>
        <AccessScreenHeader />
      </AccessScreenShell>
    );
    const page = createAccessScreenCompositionPage();
    const header = createAccessScreenHeaderPage();

    expect(page.getCard()).toContainElement(
      header.getTitle()
    );
  });
});

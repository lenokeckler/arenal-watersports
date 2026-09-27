import { expect, test } from "@playwright/test";
import { createHomePage } from "../pages/Home.page";
import { E2E_HOME_COPY } from "../constants/E2eHome.constants";

test.describe("Home", () => {
  test("shows the page heading inside the main landmark", async ({
    page,
  }) => {
    const homePage = createHomePage(page);

    await homePage.goTo();

    await expect(homePage.getHeading()).toHaveText(
      E2E_HOME_COPY.HEADING
    );
  });

  test("sets the document title from the app metadata", async ({
    page,
  }) => {
    const homePage = createHomePage(page);

    await homePage.goTo();

    await expect
      .poll(() => homePage.getDocumentTitle())
      .toBe(E2E_HOME_COPY.PAGE_TITLE);
  });
});

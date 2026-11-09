import { expect, test } from "@playwright/test";
import { PATHS } from "@/app/constants";
import { createHomePage } from "../pages/Home.page";
import { E2E_HOME_COPY } from "../constants/E2eHome.constants";
import { signInAsSeededWorker } from "../support/signInAsSeededWorker";

test.describe("Home", () => {
  test.beforeEach(async ({ page }) => {
    await signInAsSeededWorker(page);
  });

  test("loads the equipment board at the entry route", async ({
    page,
  }) => {
    const homePage = createHomePage(page);

    await homePage.goTo();

    await expect(page).toHaveURL(PATHS.HOME);
  });

  test("shows the board heading inside the main landmark at entry", async ({
    page,
  }) => {
    const homePage = createHomePage(page);

    await homePage.goTo();

    await expect(homePage.getHeading()).toHaveText(
      E2E_HOME_COPY.HEADING
    );
  });

  test("sets the document title from the board metadata", async ({
    page,
  }) => {
    const homePage = createHomePage(page);

    await homePage.goTo();

    await expect
      .poll(() => homePage.getDocumentTitle())
      .toBe(E2E_HOME_COPY.PAGE_TITLE);
  });
});

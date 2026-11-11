import { test as baseTest } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import {
  E2E_DISPATCH_BOARD_SCREENSHOT_BASENAME,
  E2E_DISPATCH_PAGE,
  E2E_DISPATCH_SEED_COUNT,
} from "../constants/E2eDispatchBoard.constants";
import {
  E2E_OUTPUT_DIR,
  E2E_SIGNED_OUT_STORAGE_STATE,
} from "../constants/E2eRuntime.constants";
import { createDispatchBoardPage } from "../pages/DispatchBoard.page";
import { createLoginPage } from "../pages/Login.page";
import { captureFullPage } from "../support/captureFullPage";
import { test, expect } from "../support/dispatchBoardTest";

baseTest.describe(
  "Dispatch board access screenshots",
  () => {
    baseTest.use({
      storageState: E2E_SIGNED_OUT_STORAGE_STATE,
    });

    baseTest(
      "captures the sign-in screen after redirect",
      async ({ page }, testInfo) => {
        const dispatchBoardPage =
          createDispatchBoardPage(page);
        const loginPage = createLoginPage(page);

        await dispatchBoardPage.goTo();
        await loginPage.getHeading().waitFor();
        await mkdir(E2E_OUTPUT_DIR.SCREENSHOTS, {
          recursive: true,
        });

        await captureFullPage(
          page,
          E2E_DISPATCH_BOARD_SCREENSHOT_BASENAME.SIGN_IN_REQUIRED,
          testInfo.project.name
        );
      }
    );
  }
);

test.describe("Dispatch board screenshots", () => {
  test.describe.configure({ mode: "serial" });

  test("captures the pending reservations of today", async ({
    pendingDispatch,
    signedInPage: page,
  }, testInfo) => {
    const dispatchBoardPage = createDispatchBoardPage(page);

    await dispatchBoardPage.goTo();
    await expect(
      dispatchBoardPage.getReservation(
        pendingDispatch.reservations[0].customerName
      )
    ).toBeVisible();

    await captureFullPage(
      page,
      E2E_DISPATCH_BOARD_SCREENSHOT_BASENAME.LIST,
      testInfo.project.name
    );
  });

  test("captures the empty message beyond the last page", async ({
    signedInPage: page,
  }, testInfo) => {
    const dispatchBoardPage = createDispatchBoardPage(page);

    await dispatchBoardPage.goToPage(
      E2E_DISPATCH_PAGE.BEYOND_LAST
    );
    await expect(
      dispatchBoardPage.getEmptyMessage()
    ).toBeVisible();

    await captureFullPage(
      page,
      E2E_DISPATCH_BOARD_SCREENSHOT_BASENAME.EMPTY,
      testInfo.project.name
    );
  });

  test.describe("with more reservations than fit in one page", () => {
    test.use({
      pendingDispatchCount:
        E2E_DISPATCH_SEED_COUNT.OVER_ONE_PAGE,
    });

    test("captures the first and the second page", async ({
      pendingDispatch,
      signedInPage: page,
    }, testInfo) => {
      const dispatchBoardPage =
        createDispatchBoardPage(page);

      await dispatchBoardPage.goTo();
      await expect(
        dispatchBoardPage.getReservation(
          pendingDispatch.reservations[0].customerName
        )
      ).toBeVisible();
      await expect(
        dispatchBoardPage.getNextLink()
      ).toBeVisible();
      await captureFullPage(
        page,
        E2E_DISPATCH_BOARD_SCREENSHOT_BASENAME.FIRST_PAGE,
        testInfo.project.name
      );

      await dispatchBoardPage.getNextLink().click();
      await expect(
        dispatchBoardPage.getPreviousLink()
      ).toBeVisible();
      await captureFullPage(
        page,
        E2E_DISPATCH_BOARD_SCREENSHOT_BASENAME.SECOND_PAGE,
        testInfo.project.name
      );
    });
  });
});

import { expect, test as baseTest } from "@playwright/test";
import { DISPATCH_BOARD_COPY } from "@/app/components/dispatch-board/constants/DispatchBoard.constants";
import { PATHS } from "@/app/constants";
import {
  E2E_DISPATCH_PAGE,
  E2E_DISPATCH_RESERVATION,
  E2E_DISPATCH_SEED_COUNT,
} from "../constants/E2eDispatchBoard.constants";
import {
  E2E_COUNT,
  E2E_SIGNED_OUT_STORAGE_STATE,
} from "../constants/E2eRuntime.constants";
import { createDispatchBoardPage } from "../pages/DispatchBoard.page";
import { createLoginPage } from "../pages/Login.page";
import { test } from "../support/dispatchBoardTest";

baseTest.describe("Dispatch board access", () => {
  baseTest.use({
    storageState: E2E_SIGNED_OUT_STORAGE_STATE,
  });

  baseTest(
    "redirects to sign in without a session",
    async ({ page }) => {
      const dispatchBoardPage =
        createDispatchBoardPage(page);
      const loginPage = createLoginPage(page);

      await dispatchBoardPage.goTo();

      await expect(page).toHaveURL(
        (url) => url.pathname === PATHS.ACCESS.LOGIN
      );
      await expect(loginPage.getHeading()).toBeVisible();
    }
  );
});

test.describe("Dispatch board for operations", () => {
  test.describe.configure({ mode: "serial" });

  test("lists a pending reservation of today with its customer, code and time", async ({
    pendingDispatch,
    signedInPage: page,
  }) => {
    const dispatchBoardPage = createDispatchBoardPage(page);
    const [reservation] = pendingDispatch.reservations;

    await dispatchBoardPage.goTo();

    await expect(
      dispatchBoardPage.getHeading()
    ).toBeVisible();
    const row = dispatchBoardPage.getReservation(
      reservation.customerName
    );
    await expect(row).toContainText(reservation.code);
    await expect(row).toContainText(
      E2E_DISPATCH_RESERVATION.FIRST_TIME
    );
  });

  test("shows the empty message and no next link beyond the last page", async ({
    signedInPage: page,
  }) => {
    const dispatchBoardPage = createDispatchBoardPage(page);

    await dispatchBoardPage.goToPage(
      E2E_DISPATCH_PAGE.BEYOND_LAST
    );

    await expect(
      dispatchBoardPage.getEmptyMessage()
    ).toBeVisible();
    await expect(
      dispatchBoardPage.getPreviousLink()
    ).toBeVisible();
    await expect(
      dispatchBoardPage.getNextLink()
    ).toHaveCount(E2E_COUNT.NONE);
  });

  test.describe("with more reservations than fit in one page", () => {
    test.use({
      pendingDispatchCount:
        E2E_DISPATCH_SEED_COUNT.OVER_ONE_PAGE,
    });

    test("offers only the next link on the first page", async ({
      pendingDispatch,
      signedInPage: page,
    }) => {
      const dispatchBoardPage =
        createDispatchBoardPage(page);
      const [first] = pendingDispatch.reservations;

      await dispatchBoardPage.goTo();

      await expect(
        dispatchBoardPage.getReservation(first.customerName)
      ).toBeVisible();
      await expect(
        dispatchBoardPage.getNextLink()
      ).toBeVisible();
      await expect(
        dispatchBoardPage.getPreviousLink()
      ).toHaveCount(E2E_COUNT.NONE);
    });

    test("moves to the second page and back to the first", async ({
      pendingDispatch,
      signedInPage: page,
    }) => {
      const dispatchBoardPage =
        createDispatchBoardPage(page);
      const [first] = pendingDispatch.reservations;

      await dispatchBoardPage.goTo();
      await dispatchBoardPage.getNextLink().click();

      await expect(page).toHaveURL(
        new RegExp(`=${E2E_DISPATCH_PAGE.SECOND}$`)
      );
      await expect(
        dispatchBoardPage.getReservations().first()
      ).toBeVisible();
      await expect(
        dispatchBoardPage.getReservation(first.customerName)
      ).toHaveCount(E2E_COUNT.NONE);

      await dispatchBoardPage.getPreviousLink().click();

      await expect(
        dispatchBoardPage.getReservation(first.customerName)
      ).toBeVisible();
      await expect(
        page.getByText(DISPATCH_BOARD_COPY.HEADING)
      ).toBeVisible();
    });
  });
});

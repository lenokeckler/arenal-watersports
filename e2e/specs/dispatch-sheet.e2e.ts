import { DISPATCH_SHEET_COPY } from "@/app/components/dispatch-board/constants/DispatchSheetCopy.constants";
import {
  E2E_DISPATCH_SHEET_EXPECTED,
  E2E_DISPATCH_SHEET_SEED,
} from "../constants/E2eDispatchSheet.constants";
import { E2E_COUNT } from "../constants/E2eRuntime.constants";
import { createDispatchBoardPage } from "../pages/DispatchBoard.page";
import { createDispatchSheetPage } from "../pages/DispatchSheet.page";
import { expect, test } from "../support/dispatchSheetTest";

test.describe("Dispatch sheet", () => {
  test("opens from the list of the day with the committed equipment", async ({
    dispatchSheet,
    signedInPage: page,
  }) => {
    const board = createDispatchBoardPage(page);
    const sheet = createDispatchSheetPage(page);

    await board.goTo();
    await sheet
      .getOpenButton(dispatchSheet.customerName)
      .click();

    await expect(sheet.getDialog()).toBeVisible();
    await expect(sheet.getDialog()).toContainText(
      dispatchSheet.categoryName
    );
    await expect(sheet.getDialog()).toContainText(
      `${DISPATCH_SHEET_COPY.COMMITTED_LABEL} ${E2E_DISPATCH_SHEET_SEED.COMMITTED_QUANTITY}`
    );
    await expect(sheet.getSubmit()).toBeDisabled();
  });

  test("closes without dispatching anything", async ({
    dispatchSheet,
    signedInPage: page,
  }) => {
    const board = createDispatchBoardPage(page);
    const sheet = createDispatchSheetPage(page);

    await board.goTo();
    await sheet
      .getOpenButton(dispatchSheet.customerName)
      .click();
    await sheet.getClose().click();

    await expect(sheet.getDialog()).toHaveCount(
      E2E_COUNT.NONE
    );
    expect(
      (await dispatchSheet.readDispatchState())
        .dispatchCount
    ).toBe(E2E_COUNT.NONE);
  });

  test("dispatches the chosen units, records who did it and clears the reservation from the pending list", async ({
    activeWorker,
    dispatchSheet,
    signedInPage: page,
  }) => {
    const board = createDispatchBoardPage(page);
    const sheet = createDispatchSheetPage(page);
    const [first, second, third] = dispatchSheet.unitCodes;

    await board.goTo();
    await sheet
      .getOpenButton(dispatchSheet.customerName)
      .click();
    await sheet.getUnit(first).check();
    await sheet.getUnit(second).check();

    await expect(sheet.getUnit(third)).toBeDisabled();
    await expect(sheet.getSubmit()).toBeEnabled();

    await sheet.getSubmit().click();

    await expect(sheet.getDialog()).toHaveCount(
      E2E_COUNT.NONE
    );
    await expect(
      board.getReservation(dispatchSheet.customerName)
    ).toHaveCount(E2E_COUNT.NONE);
    expect(await dispatchSheet.readDispatchState()).toEqual(
      {
        dispatchCount:
          E2E_DISPATCH_SHEET_EXPECTED.ONE_DISPATCH,
        dispatchCreatedBy: activeWorker.id,
        dispatchedUnitCount:
          E2E_DISPATCH_SHEET_SEED.COMMITTED_QUANTITY,
        reservationStatus:
          E2E_DISPATCH_SHEET_EXPECTED.RESERVATION_STATUS,
      }
    );
  });
});

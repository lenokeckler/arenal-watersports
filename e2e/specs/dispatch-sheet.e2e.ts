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
    await expect(
      board.getReservation(dispatchSheet.customerName)
    ).toContainText(
      `${dispatchSheet.categoryName} × ${E2E_DISPATCH_SHEET_SEED.COMMITTED_QUANTITY}`
    );
    await sheet
      .getOpenButton(dispatchSheet.customerName)
      .click();

    await expect(sheet.getDialog()).toBeVisible();
    await expect(sheet.getDialog()).toContainText(
      dispatchSheet.categoryName
    );
    await expect(sheet.getDialog()).toContainText(
      `${DISPATCH_SHEET_COPY.PENDING_LABEL} ${E2E_DISPATCH_SHEET_SEED.COMMITTED_QUANTITY}`
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
    const [first, second] = dispatchSheet.unitCodes;

    await board.goTo();
    await sheet
      .getOpenButton(dispatchSheet.customerName)
      .click();
    await sheet.getUnit(first).click();
    await sheet.getUnit(second).click();

    await expect(sheet.getChangeUnits()).toBeVisible();
    await expect(sheet.getSubmit()).toBeEnabled();

    await sheet.confirm();

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

  test("sends only one of the two committed units and keeps the other pending", async ({
    openWindowDispatchSheet: dispatchSheet,
    signedInPage: page,
  }) => {
    const board = createDispatchBoardPage(page);
    const sheet = createDispatchSheetPage(page);
    const [first] = dispatchSheet.unitCodes;

    await board.goTo();
    await sheet
      .getOpenButton(dispatchSheet.customerName)
      .click();
    await sheet.getTakeLess().click();
    await sheet.getUnit(first).click();
    await sheet.confirm();

    await expect(sheet.getDialog()).toHaveCount(
      E2E_COUNT.NONE
    );
    await expect(
      board.getReservation(dispatchSheet.customerName)
    ).toBeVisible();
    await expect(
      page.getByText(/falta 1 de 2/)
    ).toBeVisible();
    expect(
      (await dispatchSheet.readDispatchState())
        .dispatchedUnitCount
    ).toBe(E2E_DISPATCH_SHEET_EXPECTED.ONE_DISPATCH);
  });
});

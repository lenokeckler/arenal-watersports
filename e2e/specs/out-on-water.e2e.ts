import { OUT_ON_WATER_COPY } from "@/app/features/operations/out-on-water/constants/OutOnWaterCopy.constants";
import { E2E_COUNT } from "../constants/E2eRuntime.constants";
import { E2E_OUT_ON_WATER_REMAINING_PATTERN } from "../constants/E2eOutOnWater.constants";
import { createDispatchBoardPage } from "../pages/DispatchBoard.page";
import { createDispatchSheetPage } from "../pages/DispatchSheet.page";
import { createOutOnWaterPage } from "../pages/OutOnWater.page";
import { expect, test } from "../support/dispatchSheetTest";

test.describe("Equipment out", () => {
  test("lists a dispatched group with its units, its hours and the time left", async ({
    dispatchSheet,
    signedInPage: page,
  }) => {
    const board = createDispatchBoardPage(page);
    const sheet = createDispatchSheetPage(page);
    const outOnWater = createOutOnWaterPage(page);
    const [first, second] = dispatchSheet.unitCodes;

    await outOnWater.goTo();
    await expect(
      outOnWater.getGroup(dispatchSheet.customerName)
    ).toHaveCount(E2E_COUNT.NONE);

    await board.goTo();
    await sheet
      .getOpenButton(dispatchSheet.customerName)
      .click();
    await sheet.getUnit(first).check();
    await sheet.getUnit(second).check();
    await sheet.getSubmit().click();
    await expect(sheet.getDialog()).toHaveCount(
      E2E_COUNT.NONE
    );

    await outOnWater.goTo();
    const group = outOnWater.getGroup(
      dispatchSheet.customerName
    );

    await expect(outOnWater.getHeading()).toBeVisible();
    await expect(group).toContainText(
      dispatchSheet.categoryName
    );
    await expect(group).toContainText(first);
    await expect(group).toContainText(second);
    await expect(group).toContainText(
      OUT_ON_WATER_COPY.DEPARTED_AT
    );
    await expect(group).toContainText(
      OUT_ON_WATER_COPY.RETURNS_AT
    );
    await expect(group).toContainText(
      E2E_OUT_ON_WATER_REMAINING_PATTERN
    );
  });
});

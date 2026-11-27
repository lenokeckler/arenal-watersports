import {
  BOARD_UNIT_FILTER,
  BOARD_UNIT_FILTER_COPY,
} from "@/app/constants";
import { CATEGORY_UNITS_COPY } from "@/app/features/board/category-units/constants/CategoryUnitsCopy.constants";
import { createBoardStatusFilterPage } from "../pages/BoardStatusFilter.page";
import { expect, test } from "../support/dispatchSheetTest";

test.describe("Board status filter", () => {
  test("keeps the chosen status from the board into the category and opens the panel of a damaged unit", async ({
    boardMotorDispatchSheet: dispatchSheet,
    signedInPage: page,
  }) => {
    const filter = createBoardStatusFilterPage(page);
    const [otherUnit, damagedUnit] =
      dispatchSheet.unitCodes;

    await dispatchSheet.makeMaintenanceNeeds();
    await filter.goTo();
    await filter.choose(BOARD_UNIT_FILTER.DAMAGED);

    await expect(page).toHaveURL(/status=damaged/);
    await expect(filter.getTrigger()).toContainText(
      BOARD_UNIT_FILTER_COPY.LABELS.damaged
    );

    await filter
      .getCategoryCard(dispatchSheet.categoryName)
      .click();

    await expect(page).toHaveURL(/status=damaged/);
    await expect(filter.getUnit(damagedUnit)).toBeVisible();
    await expect(filter.getUnit(otherUnit)).toHaveCount(0);

    await filter.openUnit(damagedUnit);

    await expect(
      filter.getAccessLink(
        CATEGORY_UNITS_COPY.ACCESS_HISTORY
      )
    ).toBeVisible();
    await expect(
      filter.getAccessLink(
        CATEGORY_UNITS_COPY.ACCESS_DAMAGE
      )
    ).toBeVisible();
  });
});

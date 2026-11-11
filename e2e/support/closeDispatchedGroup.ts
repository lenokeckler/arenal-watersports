import type { Page } from "@playwright/test";
import { E2E_CLOSE_GROUP } from "../constants/E2eCloseGroup.constants";
import { createOutOnWaterPage } from "../pages/OutOnWater.page";
import type { DispatchedCancellationFixture } from "./models/DispatchedCancellationFixture.interface";

export const closeDispatchedGroup = async (
  page: Page,
  reservation: DispatchedCancellationFixture
): Promise<void> => {
  const outOnWater = createOutOnWaterPage(page);

  await outOnWater
    .getCloseButton(reservation.customerName)
    .click();
  await outOnWater
    .getCloseFuelPreset(
      reservation.unitCode,
      E2E_CLOSE_GROUP.FIRST.PRESET
    )
    .click();
  await outOnWater
    .getCloseUsage(reservation.unitCode)
    .fill(E2E_CLOSE_GROUP.FIRST.HOURS_TEXT);
  await outOnWater.getCloseConfirm().click();
};

import { expect, test } from "@playwright/test";
import {
  E2E_EQUIPMENT_HOURS,
  E2E_EQUIPMENT_HOURS_SCREENSHOT_BASENAME,
} from "../constants/E2eEquipmentHours.constants";
import { createEquipmentHoursPage } from "../pages/EquipmentHours.page";
import { captureFullPage } from "../support/captureFullPage";
import { createEquipmentHoursFixture } from "../support/createEquipmentHoursFixture";
import { deleteEquipmentHoursFixture } from "../support/deleteEquipmentHoursFixture";

test("captures the equipment hours report", async ({
  page,
}, testInfo) => {
  await createEquipmentHoursFixture(
    E2E_EQUIPMENT_HOURS.CUSTOMER,
    E2E_EQUIPMENT_HOURS.UNIT_CODE,
    E2E_EQUIPMENT_HOURS.HOURS
  );
  const reportPage = createEquipmentHoursPage(page);

  try {
    await reportPage.goTo();
    await expect(reportPage.getUnitRow()).toBeVisible();
    await captureFullPage(
      page,
      E2E_EQUIPMENT_HOURS_SCREENSHOT_BASENAME.REPORT,
      testInfo.project.name
    );
  } finally {
    await deleteEquipmentHoursFixture(
      E2E_EQUIPMENT_HOURS.CUSTOMER
    );
  }
});

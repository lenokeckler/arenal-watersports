import { expect, test } from "@playwright/test";
import { E2E_EQUIPMENT_HOURS } from "../constants/E2eEquipmentHours.constants";
import { createEquipmentHoursPage } from "../pages/EquipmentHours.page";
import { createEquipmentHoursFixture } from "../support/createEquipmentHoursFixture";
import { deleteEquipmentHoursFixture } from "../support/deleteEquipmentHoursFixture";

test("administration sees how many hours a unit was dispatched", async ({
  page,
}) => {
  await createEquipmentHoursFixture(
    E2E_EQUIPMENT_HOURS.CUSTOMER,
    E2E_EQUIPMENT_HOURS.UNIT_CODE,
    E2E_EQUIPMENT_HOURS.HOURS
  );
  const reportPage = createEquipmentHoursPage(page);

  try {
    await reportPage.goTo();

    await expect(reportPage.getHeading()).toBeVisible();
    await expect(reportPage.getUnitRow()).toBeVisible();
  } finally {
    await deleteEquipmentHoursFixture(
      E2E_EQUIPMENT_HOURS.CUSTOMER
    );
  }
});

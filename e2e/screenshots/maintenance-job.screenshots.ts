import { E2E_MAINTENANCE_JOB } from "../constants/E2eMaintenanceJob.constants";
import { E2E_MAINTENANCE_JOB_SCREENSHOT_BASENAME } from "../constants/E2eMaintenanceJob.constants";
import { createMaintenanceJobPage } from "../pages/MaintenanceJob.page";
import { captureFullPage } from "../support/captureFullPage";
import { expect, test } from "../support/dispatchSheetTest";

test.describe("Maintenance job screenshots", () => {
  test("captures the form of an oil change with its cost", async ({
    motorDispatchSheet: dispatchSheet,
    signedInPage: page,
  }, testInfo) => {
    const form = createMaintenanceJobPage(page);
    const [unit] = dispatchSheet.unitCodes;

    await form.goTo();
    await form.getUnit().selectOption({
      label: `${unit}${E2E_MAINTENANCE_JOB.UNIT_SEPARATOR}${dispatchSheet.categoryName}`,
    });
    await form.getWorkType().selectOption({
      label: E2E_MAINTENANCE_JOB.OIL_CHANGE,
    });
    await form
      .getNextOilChange()
      .fill(E2E_MAINTENANCE_JOB.NEW_THRESHOLD);
    await form.getCost().fill(E2E_MAINTENANCE_JOB.COST);
    await form.getCurrency().selectOption({
      label: E2E_MAINTENANCE_JOB.CURRENCY_LABEL,
    });
    await form.getExternal().check();
    await expect(form.getSubmit()).toBeEnabled();
    await captureFullPage(
      page,
      E2E_MAINTENANCE_JOB_SCREENSHOT_BASENAME.FORM,
      testInfo.project.name
    );
  });
});

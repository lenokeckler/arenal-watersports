import { EXTRA_CATALOG_COPY } from "@/app/features/administration/extra-catalog/constants/ExtraCatalogCopy.constants";
import { EXTRA_FORM_MODE } from "@/app/features/administration/extra-catalog/constants/ExtraFormMode.constants";
import { EXTRA_FORM_TITLE } from "@/app/features/administration/extra-catalog/constants/ExtraFormModeCopy.constants";
import { resolveExtraEditPath } from "@/app/features/administration/extra-catalog/utils/resolveExtraEditPath";
import {
  E2E_EXTRA_FORM_SCENARIO,
  E2E_EXTRA_FORM_SCREENSHOT_BASENAME,
} from "../constants/E2eExtraForm.constants";
import { resolveDeviceScreenshotFileName } from "../constants/E2eScreenshot.constants";
import { captureViewport } from "../support/captureViewport";
import { test } from "../support/extraFormTest";

test.describe("Extra form screenshots", () => {
  test("captures the create form with the required error", async ({
    page,
    formPage,
  }, testInfo) => {
    await formPage.goTo();
    await formPage.submit(
      EXTRA_CATALOG_COPY.SUBMIT_BUTTON_CREATE
    );
    await formPage.getNameError().waitFor();

    await captureViewport(
      page,
      resolveDeviceScreenshotFileName(
        E2E_EXTRA_FORM_SCREENSHOT_BASENAME.CREATE_ERROR,
        testInfo.project.name
      )
    );
  });

  test("captures the edit form", async ({
    page,
    formPage,
    seedExtra,
  }, testInfo) => {
    const { id } = await seedExtra({
      scenario: E2E_EXTRA_FORM_SCENARIO.SCREENSHOT_EDIT,
    });

    await formPage.goTo(resolveExtraEditPath(id));
    await formPage
      .getHeading(EXTRA_FORM_TITLE[EXTRA_FORM_MODE.EDIT])
      .waitFor();

    await captureViewport(
      page,
      resolveDeviceScreenshotFileName(
        E2E_EXTRA_FORM_SCREENSHOT_BASENAME.EDIT,
        testInfo.project.name
      )
    );
  });
});

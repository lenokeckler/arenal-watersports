import {
  E2E_EXTRA_REMOVAL_SCREENSHOT_BASENAME,
  E2E_EXTRA_SCENARIO,
} from "../constants/E2eExtraList.constants";
import { resolveDeviceScreenshotFileName } from "../constants/E2eScreenshot.constants";
import { captureViewport } from "../support/captureViewport";
import { test } from "../support/extraListTest";

test.describe("Extra removal screenshots", () => {
  test("captures the inline removal confirmation", async ({
    page,
    listPage,
    seedExtra,
  }, testInfo) => {
    const { name } = await seedExtra({
      scenario: E2E_EXTRA_SCENARIO.SCREENSHOT_REMOVAL,
    });

    await listPage.goTo();
    await listPage.getRemoveButton(name).click();
    await listPage.getRemovalConfirmMessage(name).waitFor();

    await captureViewport(
      page,
      resolveDeviceScreenshotFileName(
        E2E_EXTRA_REMOVAL_SCREENSHOT_BASENAME,
        testInfo.project.name
      )
    );
  });
});

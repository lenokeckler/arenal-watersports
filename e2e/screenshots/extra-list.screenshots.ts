import { EXTRA_STATUS } from "@/app/features/administration/extra-catalog/constants/ExtraStatus.constants";
import {
  E2E_EXTRA_LIST_SCREENSHOT_BASENAME,
  E2E_EXTRA_SCENARIO,
} from "../constants/E2eExtraList.constants";
import { resolveDeviceScreenshotFileName } from "../constants/E2eScreenshot.constants";
import { captureViewport } from "../support/captureViewport";
import { test } from "../support/extraListTest";

test.describe("Extra list screenshots", () => {
  test("captures the ready state with active and inactive extras", async ({
    page,
    listPage,
    seedExtra,
  }, testInfo) => {
    await seedExtra({
      scenario: E2E_EXTRA_SCENARIO.SCREENSHOT_ACTIVE,
    });
    await seedExtra({
      scenario: E2E_EXTRA_SCENARIO.SCREENSHOT_INACTIVE,
      status: EXTRA_STATUS.INACTIVE,
    });

    await listPage.goTo();
    await listPage.getHeading().waitFor();

    await captureViewport(
      page,
      resolveDeviceScreenshotFileName(
        E2E_EXTRA_LIST_SCREENSHOT_BASENAME,
        testInfo.project.name
      )
    );
  });
});

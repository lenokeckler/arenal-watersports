import { test } from "@playwright/test";
import { capturePredefinedComboScreenshots } from "../support/predefinedComboScreenshotSteps";

test("captures predefined package selection states", async ({
  page,
}, testInfo) => {
  await capturePredefinedComboScreenshots(
    page,
    testInfo.project.name
  );
});

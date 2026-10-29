import { test } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { createDispatchBoardPage } from "../pages/DispatchBoard.page";
import { captureViewport } from "../support/captureViewport";
import { E2E_OUTPUT_DIR } from "../constants/E2eRuntime.constants";
import { resolveDeviceScreenshotFileName } from "../constants/E2eScreenshot.constants";
import { E2E_DISPATCH_BOARD_COPY } from "../constants/E2eDispatchBoard.constants";
import { createLoginPage } from "../pages/Login.page";

test.describe("Dispatch board access screenshots", () => {
  test("captures the sign-in screen after redirect", async ({
    page,
  }, testInfo) => {
    const dispatchBoardPage = createDispatchBoardPage(page);
    const loginPage = createLoginPage(page);

    await dispatchBoardPage.goTo();
    await loginPage.getHeading().waitFor();
    await mkdir(E2E_OUTPUT_DIR.SCREENSHOTS, {
      recursive: true,
    });

    await captureViewport(
      page,
      resolveDeviceScreenshotFileName(
        E2E_DISPATCH_BOARD_COPY.SCREENSHOT_BASENAME,
        testInfo.project.name
      )
    );
  });
});

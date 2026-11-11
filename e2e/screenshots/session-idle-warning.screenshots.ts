import {
  E2E_SESSION_IDLE_WARNING_SCREENSHOT_BASENAME,
  E2E_SESSION_IDLE_WARNING_SECONDS,
} from "../constants/E2eSessionIdleWarning.constants";
import { createHomePage } from "../pages/Home.page";
import { createSessionIdleWarningPage } from "../pages/SessionIdleWarning.page";
import { expect, test } from "../support/activeWorkerTest";
import { answerSessionSecondsLeft } from "../support/answerSessionSecondsLeft";
import { captureFullPage } from "../support/captureFullPage";

test.describe("Idle warning screenshots", () => {
  test("captures the warning over the home", async ({
    signedInPage: page,
  }, testInfo) => {
    const warning = createSessionIdleWarningPage(page);
    await answerSessionSecondsLeft(
      page,
      E2E_SESSION_IDLE_WARNING_SECONDS.INSIDE_THE_WARNING
    );

    await createHomePage(page).goTo();
    await expect(warning.getDialog()).toBeVisible();

    await captureFullPage(
      page,
      E2E_SESSION_IDLE_WARNING_SCREENSHOT_BASENAME.WARNING,
      testInfo.project.name
    );
  });
});

import { PATHS } from "@/app/constants";
import { E2E_SESSION_ACTIVITY_AGE } from "../constants/E2eSessionIdle.constants";
import {
  E2E_SESSION_IDLE_WARNING_RPC,
  E2E_SESSION_IDLE_WARNING_SECONDS,
} from "../constants/E2eSessionIdleWarning.constants";
import { createHomePage } from "../pages/Home.page";
import { createLoginPage } from "../pages/Login.page";
import { createSessionIdleWarningPage } from "../pages/SessionIdleWarning.page";
import { expect, test } from "../support/activeWorkerTest";
import { answerSessionSecondsLeft } from "../support/answerSessionSecondsLeft";
import { expectServerSessionEnded } from "../support/expectServerSessionEnded";
import { setSessionActivityAge } from "../support/setSessionActivityAge";

test.describe("Warning before the night inactivity limit", () => {
  test("shows the countdown when the server says two minutes or less are left", async ({
    signedInPage: page,
  }) => {
    const warning = createSessionIdleWarningPage(page);
    await answerSessionSecondsLeft(
      page,
      E2E_SESSION_IDLE_WARNING_SECONDS.INSIDE_THE_WARNING
    );

    await createHomePage(page).goTo();

    await expect(warning.getDialog()).toContainText(
      E2E_SESSION_IDLE_WARNING_SECONDS.SHOWN_INSIDE_THE_WARNING
    );
    await expect(warning.getKeepWorking()).toBeFocused();
  });

  test("shows no warning while the session has time left", async ({
    signedInPage: page,
  }) => {
    const homePage = createHomePage(page);
    const secondsLeftAnswer = page.waitForResponse(
      E2E_SESSION_IDLE_WARNING_RPC.SECONDS_LEFT
    );

    await homePage.goTo();
    await secondsLeftAnswer;

    await expect(homePage.getHeading()).toBeVisible();
    await expect(
      createSessionIdleWarningPage(page).getDialog()
    ).toHaveCount(0);
  });

  test("Seguir trabajando records an action and closes the warning", async ({
    signedInPage: page,
  }) => {
    const warning = createSessionIdleWarningPage(page);
    const releaseSecondsLeft =
      await answerSessionSecondsLeft(
        page,
        E2E_SESSION_IDLE_WARNING_SECONDS.INSIDE_THE_WARNING
      );
    await createHomePage(page).goTo();
    await expect(warning.getDialog()).toBeVisible();
    await releaseSecondsLeft();
    const touch = page.waitForRequest(
      E2E_SESSION_IDLE_WARNING_RPC.TOUCH
    );

    await warning.getKeepWorking().click();

    await touch;
    await expect(warning.getDialog()).toHaveCount(0);
    await expect(page).toHaveURL(PATHS.HOME);
  });

  test("Cerrar sesión signs this device out and says so on the login", async ({
    signedInPage: page,
  }) => {
    const warning = createSessionIdleWarningPage(page);
    await answerSessionSecondsLeft(
      page,
      E2E_SESSION_IDLE_WARNING_SECONDS.INSIDE_THE_WARNING
    );
    await createHomePage(page).goTo();
    await expect(warning.getDialog()).toBeVisible();

    await warning.getSignOut().click();

    await expect(page).toHaveURL(PATHS.ACCESS.LOGIN);
    await expect(
      createLoginPage(page).getSignedOutNotice()
    ).toBeVisible();
  });

  test("closes the session when the countdown ends without an answer", async ({
    activeWorker,
    signedInPage: page,
  }) => {
    const warning = createSessionIdleWarningPage(page);
    const releaseSecondsLeft =
      await answerSessionSecondsLeft(
        page,
        E2E_SESSION_IDLE_WARNING_SECONDS.ABOUT_TO_END
      );
    await createHomePage(page).goTo();
    await expect(warning.getDialog()).toBeVisible();
    await releaseSecondsLeft();
    await setSessionActivityAge(
      activeWorker.id,
      E2E_SESSION_ACTIVITY_AGE.PAST_ANY_NIGHT
    );

    await expect(page).toHaveURL(PATHS.ACCESS.LOGIN);
    await expect(
      createLoginPage(page).getSessionIdleNotice()
    ).toBeVisible();
    await expectServerSessionEnded(activeWorker.id);
  });
});

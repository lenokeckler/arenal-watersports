import { PATHS } from "@/app/constants";
import { E2E_LOGIN_COPY } from "../constants/E2eLogin.constants";
import { E2E_OPEN_SESSIONS } from "../constants/E2eActiveWorker.constants";
import { E2E_AUTH_ERROR_CODE } from "../constants/E2eSupabase.constants";
import {
  E2E_PROFILE_COPY,
  E2E_PROFILE_NEW_PASSWORD,
} from "../constants/E2eProfile.constants";
import { E2E_TIMEOUT_MS } from "../constants/E2eRuntime.constants";
import { createLoginPage } from "../pages/Login.page";
import { createProfilePage } from "../pages/Profile.page";
import { createProfilePasswordPage } from "../pages/ProfilePassword.page";
import { expect, test } from "../support/activeWorkerTest";
import { countAuthSessions } from "../support/countAuthSessions";
import { refreshContextSession } from "../support/refreshContextSession";
import { signInAsActiveWorker } from "../support/signInAsActiveWorker";

test.describe("Profile password change", () => {
  test("lands on the profile with the notice once and a clean address", async ({
    activeWorker,
    signedInPage: page,
  }) => {
    const passwordPage = createProfilePasswordPage(page);
    const profilePage = createProfilePage(page);
    await passwordPage.goTo();
    await passwordPage.fillForm({
      confirmPassword: E2E_PROFILE_NEW_PASSWORD,
      currentPassword: activeWorker.password,
      newPassword: E2E_PROFILE_NEW_PASSWORD,
    });

    await passwordPage.submit();

    await expect(profilePage.getNotice()).toContainText(
      E2E_PROFILE_COPY.PASSWORD_CHANGED_NOTICE,
      { timeout: E2E_TIMEOUT_MS.POST_SUBMIT }
    );
    await expect(page).toHaveURL(PATHS.PROFILE.ROOT, {
      timeout: E2E_TIMEOUT_MS.POST_SUBMIT,
    });

    await page.reload();

    await expect(profilePage.getHeading()).toBeVisible();
    await expect(profilePage.getNotice()).toHaveCount(0);
  });

  test("replaces the password and closes the sessions of other devices", async ({
    activeWorker,
    browser,
    context,
    signedInPage: page,
  }) => {
    const otherContext = await browser.newContext();
    try {
      await signInAsActiveWorker(
        await otherContext.newPage(),
        activeWorker
      );
      expect(await countAuthSessions(activeWorker.id)).toBe(
        E2E_OPEN_SESSIONS.BEFORE_CHANGE
      );
      expect(
        await refreshContextSession(otherContext)
      ).toBeNull();
      const passwordPage = createProfilePasswordPage(page);
      await passwordPage.goTo();
      await passwordPage.fillForm({
        confirmPassword: E2E_PROFILE_NEW_PASSWORD,
        currentPassword: activeWorker.password,
        newPassword: E2E_PROFILE_NEW_PASSWORD,
      });

      await passwordPage.submit();
      await expect(page).toHaveURL(PATHS.PROFILE.ROOT, {
        timeout: E2E_TIMEOUT_MS.POST_SUBMIT,
      });

      expect(await countAuthSessions(activeWorker.id)).toBe(
        E2E_OPEN_SESSIONS.AFTER_CHANGE
      );
      const refreshError =
        await refreshContextSession(otherContext);
      expect(refreshError?.code).toBe(
        E2E_AUTH_ERROR_CODE.SESSION_GONE
      );
    } finally {
      await otherContext.close();
    }

    await context.clearCookies();
    const loginPage = createLoginPage(page);
    await loginPage.goTo();
    await loginPage.fillUsername(activeWorker.username);
    await loginPage.fillPassword(activeWorker.password);
    await loginPage.submit();
    await expect(loginPage.getPasswordError()).toHaveText(
      E2E_LOGIN_COPY.INVALID_CREDENTIALS
    );

    await loginPage.fillPassword(E2E_PROFILE_NEW_PASSWORD);
    await loginPage.submit();
    await expect(page).toHaveURL(PATHS.HOME);
  });
});

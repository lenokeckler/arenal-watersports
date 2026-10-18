import { PATHS } from "@/app/constants";
import {
  E2E_LOGOUT_BAR_COUNT,
  E2E_LOGOUT_CLOCK,
} from "../constants/E2eLogout.constants";
import { createHomePage } from "../pages/Home.page";
import { createLoginPage } from "../pages/Login.page";
import { createProfilePage } from "../pages/Profile.page";
import { createSessionBarPage } from "../pages/SessionBar.page";
import { expect, test } from "../support/activeWorkerTest";

test.describe("Sign out", () => {
  test("asks for confirmation on the first tap and signs out on the second from the home page", async ({
    signedInPage: page,
  }) => {
    const sessionBar = createSessionBarPage(page);
    const loginPage = createLoginPage(page);
    await createHomePage(page).goTo();

    await sessionBar.press();

    await expect(
      sessionBar.getConfirmButton()
    ).toBeVisible();

    await sessionBar.confirmSignOut();

    await expect(page).toHaveURL(PATHS.ACCESS.LOGIN);
    await expect(
      loginPage.getSignedOutNotice()
    ).toBeVisible();
    await expect(loginPage.getUsernameInput()).toBeEmpty();
    await expect(loginPage.getPasswordInput()).toBeEmpty();
    await expect(sessionBar.getBar()).toHaveCount(
      E2E_LOGOUT_BAR_COUNT.ABSENT
    );
  });

  test("signs out from the profile page with the same two taps", async ({
    signedInPage: page,
  }) => {
    const sessionBar = createSessionBarPage(page);
    const loginPage = createLoginPage(page);
    await createProfilePage(page).goTo();

    await sessionBar.press();
    await expect(
      sessionBar.getConfirmButton()
    ).toBeVisible();
    await expect(page).toHaveURL(PATHS.PROFILE.ROOT);
    await sessionBar.confirmSignOut();

    await expect(page).toHaveURL(PATHS.ACCESS.LOGIN);
    await expect(
      loginPage.getSignedOutNotice()
    ).toBeVisible();
    await expect(loginPage.getUsernameInput()).toBeEmpty();
    await expect(loginPage.getPasswordInput()).toBeEmpty();
  });

  test("returns to the idle label exactly when the confirmation window ends and keeps the session", async ({
    signedInPage: page,
  }) => {
    const sessionBar = createSessionBarPage(page);
    await page.clock.install({
      time: E2E_LOGOUT_CLOCK.START,
    });
    await createHomePage(page).goTo();
    await page.clock.pauseAt(E2E_LOGOUT_CLOCK.PAUSE_AT);
    await sessionBar.press();
    await expect(
      sessionBar.getConfirmButton()
    ).toBeVisible();

    await page.clock.runFor(
      E2E_LOGOUT_CLOCK.BEFORE_RESET_MS
    );

    await expect(
      sessionBar.getConfirmButton()
    ).toBeVisible();

    await page.clock.runFor(E2E_LOGOUT_CLOCK.ONE_MS);

    await expect(sessionBar.getIdleButton()).toBeVisible();
    await expect(page).toHaveURL(PATHS.HOME);
    await createProfilePage(page).goTo();
    await expect(page).toHaveURL(PATHS.PROFILE.ROOT);
  });
});

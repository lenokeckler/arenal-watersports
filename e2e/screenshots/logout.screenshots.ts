import { PATHS } from "@/app/constants";
import { E2E_LOGOUT_SCREENSHOT_BASENAME } from "../constants/E2eLogout.constants";
import { createHomePage } from "../pages/Home.page";
import { createLoginPage } from "../pages/Login.page";
import { createProfilePage } from "../pages/Profile.page";
import { createSessionBarPage } from "../pages/SessionBar.page";
import { expect, test } from "../support/activeWorkerTest";
import { captureFullPage } from "../support/captureFullPage";
import { holdLogoutRequests } from "../support/holdLogoutRequests";

test.describe("Sign-out screenshots", () => {
  test("captures the home with the session bar", async ({
    signedInPage: page,
  }, testInfo) => {
    const homePage = createHomePage(page);
    const sessionBar = createSessionBarPage(page);

    await homePage.goTo();
    await expect(homePage.getHeading()).toBeVisible();
    await expect(sessionBar.getIdleButton()).toBeVisible();

    await captureFullPage(
      page,
      E2E_LOGOUT_SCREENSHOT_BASENAME.HOME_WITH_BAR,
      testInfo.project.name
    );
  });

  test("captures the profile with the session bar", async ({
    signedInPage: page,
  }, testInfo) => {
    const profilePage = createProfilePage(page);
    const sessionBar = createSessionBarPage(page);

    await profilePage.goTo();
    await expect(profilePage.getHeading()).toBeVisible();
    await expect(sessionBar.getIdleButton()).toBeVisible();

    await captureFullPage(
      page,
      E2E_LOGOUT_SCREENSHOT_BASENAME.PROFILE_WITH_BAR,
      testInfo.project.name
    );
  });

  test("captures the confirm step on the home", async ({
    signedInPage: page,
  }, testInfo) => {
    const homePage = createHomePage(page);
    const sessionBar = createSessionBarPage(page);
    await homePage.goTo();
    await expect(homePage.getHeading()).toBeVisible();

    await sessionBar.press();
    await expect(
      sessionBar.getConfirmButton()
    ).toBeVisible();

    await captureFullPage(
      page,
      E2E_LOGOUT_SCREENSHOT_BASENAME.CONFIRM_STEP,
      testInfo.project.name
    );
  });

  test("captures the pending step while the logout request is held", async ({
    signedInPage: page,
  }, testInfo) => {
    const homePage = createHomePage(page);
    const sessionBar = createSessionBarPage(page);
    const logoutHold = await holdLogoutRequests(page);
    await homePage.goTo();
    await expect(homePage.getHeading()).toBeVisible();
    await sessionBar.press();

    await sessionBar.confirmSignOut();
    await expect(
      sessionBar.getPendingButton()
    ).toBeVisible();

    await captureFullPage(
      page,
      E2E_LOGOUT_SCREENSHOT_BASENAME.PENDING_STEP,
      testInfo.project.name
    );
    logoutHold.release();
    await expect(page).toHaveURL(PATHS.ACCESS.LOGIN);
  });

  test("captures the login right after signing out", async ({
    signedInPage: page,
  }, testInfo) => {
    const homePage = createHomePage(page);
    const loginPage = createLoginPage(page);
    await homePage.goTo();
    await expect(homePage.getHeading()).toBeVisible();

    await createSessionBarPage(page).signOut();
    await expect(
      loginPage.getSignedOutNotice()
    ).toBeVisible();
    await expect(loginPage.getUsernameInput()).toHaveValue(
      ""
    );
    await expect(loginPage.getPasswordInput()).toHaveValue(
      ""
    );

    await captureFullPage(
      page,
      E2E_LOGOUT_SCREENSHOT_BASENAME.LOGIN_AFTER_SIGN_OUT,
      testInfo.project.name
    );
  });
});

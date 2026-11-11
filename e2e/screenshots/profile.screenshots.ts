import { PASSWORD_CHANGE_FIELD } from "@/app/constants/access/PasswordChangeError.constants";
import {
  E2E_PROFILE_COPY,
  E2E_PROFILE_INVALID_PASSWORDS,
  E2E_PROFILE_SCREENSHOT_BASENAME,
} from "../constants/E2eProfile.constants";
import { createProfilePage } from "../pages/Profile.page";
import { createProfilePasswordPage } from "../pages/ProfilePassword.page";
import { expect, test } from "../support/activeWorkerTest";
import { captureFullPage } from "../support/captureFullPage";

test.describe("Profile screenshots", () => {
  test("captures the profile hub", async ({
    signedInPage: page,
  }, testInfo) => {
    const profilePage = createProfilePage(page);

    await profilePage.goTo();
    await expect(profilePage.getHeading()).toBeVisible();
    await expect(
      profilePage.getPasswordEntry()
    ).toBeVisible();

    await captureFullPage(
      page,
      E2E_PROFILE_SCREENSHOT_BASENAME.HUB,
      testInfo.project.name
    );
  });

  test("captures the profile hub after a password change", async ({
    signedInPage: page,
  }, testInfo) => {
    const profilePage = createProfilePage(page);

    await profilePage.goToWithPasswordChangedNotice();
    await expect(profilePage.getNotice()).toContainText(
      E2E_PROFILE_COPY.PASSWORD_CHANGED_NOTICE
    );

    await captureFullPage(
      page,
      E2E_PROFILE_SCREENSHOT_BASENAME.HUB_WITH_NOTICE,
      testInfo.project.name
    );
  });

  test("captures the password form with the rules before typing", async ({
    signedInPage: page,
  }, testInfo) => {
    const passwordPage = createProfilePasswordPage(page);

    await passwordPage.goTo();
    await expect(passwordPage.getHeading()).toBeVisible();
    await expect(
      passwordPage.getRulesTitle()
    ).toBeVisible();

    await captureFullPage(
      page,
      E2E_PROFILE_SCREENSHOT_BASENAME.PASSWORD_FORM,
      testInfo.project.name
    );
  });

  test("captures the password form with field errors", async ({
    signedInPage: page,
  }, testInfo) => {
    const passwordPage = createProfilePasswordPage(page);

    await passwordPage.goTo();
    await passwordPage.fillForm({
      confirmPassword: E2E_PROFILE_INVALID_PASSWORDS.OTHER,
      currentPassword:
        E2E_PROFILE_INVALID_PASSWORDS.CURRENT,
      newPassword: E2E_PROFILE_INVALID_PASSWORDS.WEAK,
    });
    await passwordPage.revealPassword(
      PASSWORD_CHANGE_FIELD.CURRENT_PASSWORD
    );
    await passwordPage.revealPassword(
      PASSWORD_CHANGE_FIELD.NEW_PASSWORD
    );
    await passwordPage.revealPassword(
      PASSWORD_CHANGE_FIELD.CONFIRM_PASSWORD
    );
    await passwordPage.submit();
    await expect(
      passwordPage.getNewPasswordError()
    ).toHaveText(E2E_PROFILE_COPY.NEW_PASSWORD_RULES);

    await captureFullPage(
      page,
      E2E_PROFILE_SCREENSHOT_BASENAME.PASSWORD_FORM_ERRORS,
      testInfo.project.name
    );
  });

  test("captures the password form refusing a common password", async ({
    activeWorker,
    signedInPage: page,
  }, testInfo) => {
    const passwordPage = createProfilePasswordPage(page);

    await passwordPage.goTo();
    await passwordPage.fillForm({
      confirmPassword: E2E_PROFILE_INVALID_PASSWORDS.COMMON,
      currentPassword: activeWorker.password,
      newPassword: E2E_PROFILE_INVALID_PASSWORDS.COMMON,
    });
    await passwordPage.revealPassword(
      PASSWORD_CHANGE_FIELD.NEW_PASSWORD
    );
    await passwordPage.revealPassword(
      PASSWORD_CHANGE_FIELD.CONFIRM_PASSWORD
    );
    await passwordPage.submit();
    await expect(
      passwordPage.getNewPasswordError()
    ).toHaveText(E2E_PROFILE_COPY.NEW_PASSWORD_COMMON);

    await captureFullPage(
      page,
      E2E_PROFILE_SCREENSHOT_BASENAME.PASSWORD_FORM_COMMON,
      testInfo.project.name
    );
  });
});

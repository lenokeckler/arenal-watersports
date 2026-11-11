import {
  E2E_PERSONAL_EMAIL_ADDRESS,
  E2E_PERSONAL_EMAIL_COPY,
  E2E_PERSONAL_EMAIL_ENTRY_NAME,
  E2E_PERSONAL_EMAIL_SCREENSHOT_BASENAME,
} from "../constants/E2ePersonalEmail.constants";
import { createPersonalEmailPage } from "../pages/PersonalEmail.page";
import { createProfilePage } from "../pages/Profile.page";
import { expect, test } from "../support/activeWorkerTest";
import { captureFullPage } from "../support/captureFullPage";

test.describe("Profile hub email screenshots", () => {
  test("captures Mi perfil with the email not registered", async ({
    signedInPage: page,
  }, testInfo) => {
    const profilePage = createProfilePage(page);

    await profilePage.goTo();
    await expect(
      profilePage.getEmailEntry()
    ).toHaveAccessibleName(
      E2E_PERSONAL_EMAIL_ENTRY_NAME.NOT_REGISTERED
    );

    await captureFullPage(
      page,
      E2E_PERSONAL_EMAIL_SCREENSHOT_BASENAME.HUB_NOT_REGISTERED,
      testInfo.project.name
    );
  });

  test("captures Mi perfil with the saved notice", async ({
    activeWorker,
    signedInPage: page,
  }, testInfo) => {
    const emailPage = createPersonalEmailPage(page);
    const profilePage = createProfilePage(page);
    await emailPage.goTo();
    await emailPage.fillEmail(
      E2E_PERSONAL_EMAIL_ADDRESS.STORED
    );
    await emailPage.fillPassword(activeWorker.password);

    await emailPage.save();

    await expect(profilePage.getNotice()).toContainText(
      E2E_PERSONAL_EMAIL_COPY.SAVED_NOTICE
    );
    await captureFullPage(
      page,
      E2E_PERSONAL_EMAIL_SCREENSHOT_BASENAME.HUB_SAVED,
      testInfo.project.name
    );
  });

  test.describe("with a registered address", () => {
    test.use({
      personalEmail: E2E_PERSONAL_EMAIL_ADDRESS.EXISTING,
    });

    test("captures Mi perfil with the email registered", async ({
      signedInPage: page,
    }, testInfo) => {
      const profilePage = createProfilePage(page);

      await profilePage.goTo();
      await expect(
        profilePage.getEmailEntry()
      ).toHaveAccessibleName(
        E2E_PERSONAL_EMAIL_ENTRY_NAME.REGISTERED
      );

      await captureFullPage(
        page,
        E2E_PERSONAL_EMAIL_SCREENSHOT_BASENAME.HUB_REGISTERED,
        testInfo.project.name
      );
    });
  });
});

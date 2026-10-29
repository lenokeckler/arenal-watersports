import {
  E2E_PERSONAL_EMAIL_ADDRESS,
  E2E_PERSONAL_EMAIL_ERROR_COPY,
  E2E_PERSONAL_EMAIL_PASSWORD,
  E2E_PERSONAL_EMAIL_SCREENSHOT_BASENAME,
} from "../constants/E2ePersonalEmail.constants";
import { createPersonalEmailPage } from "../pages/PersonalEmail.page";
import { expect, test } from "../support/activeWorkerTest";
import { captureFullPage } from "../support/captureFullPage";

test.describe("Personal email form screenshots", () => {
  test("captures the email form empty", async ({
    signedInPage: page,
  }, testInfo) => {
    const emailPage = createPersonalEmailPage(page);

    await emailPage.goTo();
    await expect(emailPage.getHeading()).toBeVisible();

    await captureFullPage(
      page,
      E2E_PERSONAL_EMAIL_SCREENSHOT_BASENAME.FORM_EMPTY,
      testInfo.project.name
    );
  });

  test("captures the email form with an invalid address and the password revealed", async ({
    activeWorker,
    signedInPage: page,
  }, testInfo) => {
    const emailPage = createPersonalEmailPage(page);
    await emailPage.goTo();
    await emailPage.fillEmail(
      E2E_PERSONAL_EMAIL_ADDRESS.INVALID
    );
    await emailPage.fillPassword(activeWorker.password);
    await emailPage.revealPassword();

    await emailPage.save();

    await expect(emailPage.getEmailError()).toHaveText(
      E2E_PERSONAL_EMAIL_ERROR_COPY.EMAIL_INVALID
    );
    await captureFullPage(
      page,
      E2E_PERSONAL_EMAIL_SCREENSHOT_BASENAME.FORM_ERRORS,
      testInfo.project.name
    );
  });

  test("captures the email form with the wrong password typed and after it is rejected", async ({
    signedInPage: page,
  }, testInfo) => {
    const emailPage = createPersonalEmailPage(page);
    await emailPage.goTo();
    await emailPage.fillEmail(
      E2E_PERSONAL_EMAIL_ADDRESS.STORED
    );
    await emailPage.fillPassword(
      E2E_PERSONAL_EMAIL_PASSWORD.WRONG
    );
    await emailPage.revealPassword();
    await captureFullPage(
      page,
      E2E_PERSONAL_EMAIL_SCREENSHOT_BASENAME.FORM_WRONG_PASSWORD_TYPED,
      testInfo.project.name
    );

    await emailPage.save();

    await expect(emailPage.getPasswordError()).toHaveText(
      E2E_PERSONAL_EMAIL_ERROR_COPY.CURRENT_PASSWORD_INVALID
    );
    await captureFullPage(
      page,
      E2E_PERSONAL_EMAIL_SCREENSHOT_BASENAME.FORM_WRONG_PASSWORD,
      testInfo.project.name
    );
  });

  test.describe("with a registered address", () => {
    test.use({
      personalEmail: E2E_PERSONAL_EMAIL_ADDRESS.EXISTING,
    });

    test("captures the email form with the address and Quitar", async ({
      signedInPage: page,
    }, testInfo) => {
      const emailPage = createPersonalEmailPage(page);

      await emailPage.goTo();
      await expect(emailPage.getEmailInput()).toHaveValue(
        E2E_PERSONAL_EMAIL_ADDRESS.EXISTING
      );
      await expect(
        emailPage.getRemoveButton()
      ).toBeVisible();

      await captureFullPage(
        page,
        E2E_PERSONAL_EMAIL_SCREENSHOT_BASENAME.FORM_REGISTERED,
        testInfo.project.name
      );
    });
  });
});

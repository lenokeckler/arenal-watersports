import { PATHS } from "@/app/constants";
import {
  E2E_PERSONAL_EMAIL_ADDRESS,
  E2E_PERSONAL_EMAIL_COPY,
  E2E_PERSONAL_EMAIL_ENTRY_NAME,
} from "../constants/E2ePersonalEmail.constants";
import { E2E_TIMEOUT_MS } from "../constants/E2eRuntime.constants";
import { createPersonalEmailPage } from "../pages/PersonalEmail.page";
import { createProfilePage } from "../pages/Profile.page";
import { expect, test } from "../support/activeWorkerTest";
import { readWorkerPersonalEmail } from "../support/readWorkerPersonalEmail";

test.describe("Personal email save", () => {
  test("saves a trimmed lowercase address from Mi perfil and keeps it off the hub", async ({
    activeWorker,
    signedInPage: page,
  }) => {
    const profilePage = createProfilePage(page);
    const emailPage = createPersonalEmailPage(page);
    await profilePage.goTo();
    await expect(
      profilePage.getEmailEntry()
    ).toHaveAccessibleName(
      E2E_PERSONAL_EMAIL_ENTRY_NAME.NOT_REGISTERED
    );
    await profilePage.goToEmailEntry();
    await expect(page).toHaveURL(PATHS.PROFILE.EMAIL);
    await emailPage.fillEmail(
      E2E_PERSONAL_EMAIL_ADDRESS.TYPED
    );
    await emailPage.fillPassword(activeWorker.password);

    await emailPage.submitWithEnter();

    await expect(page).toHaveURL(PATHS.PROFILE.ROOT, {
      timeout: E2E_TIMEOUT_MS.POST_SUBMIT,
    });
    await expect(profilePage.getNotice()).toContainText(
      E2E_PERSONAL_EMAIL_COPY.SAVED_NOTICE
    );
    await expect(
      profilePage.getEmailEntry()
    ).toHaveAccessibleName(
      E2E_PERSONAL_EMAIL_ENTRY_NAME.REGISTERED
    );
    expect(
      await readWorkerPersonalEmail(activeWorker.id)
    ).toBe(E2E_PERSONAL_EMAIL_ADDRESS.STORED);
    await expect(
      profilePage.findText(
        E2E_PERSONAL_EMAIL_ADDRESS.STORED
      )
    ).toBeHidden();
  });

  test.describe("with a registered address", () => {
    test.use({
      personalEmail: E2E_PERSONAL_EMAIL_ADDRESS.EXISTING,
    });

    test("prefills the address and offers Quitar", async ({
      signedInPage: page,
    }) => {
      const emailPage = createPersonalEmailPage(page);

      await emailPage.goTo();

      await expect(emailPage.getEmailInput()).toHaveValue(
        E2E_PERSONAL_EMAIL_ADDRESS.EXISTING
      );
      await expect(
        emailPage.getRemoveButton()
      ).toBeVisible();
    });
  });
});

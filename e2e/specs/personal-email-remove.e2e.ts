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

test.describe("Personal email removal", () => {
  test.use({
    personalEmail: E2E_PERSONAL_EMAIL_ADDRESS.EXISTING,
  });

  test("removes the address with the current password and marks the entry as unregistered", async ({
    activeWorker,
    signedInPage: page,
  }) => {
    const emailPage = createPersonalEmailPage(page);
    const profilePage = createProfilePage(page);
    await emailPage.goTo();
    await emailPage.fillPassword(activeWorker.password);

    await emailPage.remove();

    await expect(page).toHaveURL(PATHS.PROFILE.ROOT, {
      timeout: E2E_TIMEOUT_MS.POST_SUBMIT,
    });
    await expect(profilePage.getNotice()).toContainText(
      E2E_PERSONAL_EMAIL_COPY.REMOVED_NOTICE
    );
    await expect(
      profilePage.getEmailEntry()
    ).toHaveAccessibleName(
      E2E_PERSONAL_EMAIL_ENTRY_NAME.NOT_REGISTERED
    );
    expect(
      await readWorkerPersonalEmail(activeWorker.id)
    ).toBeNull();
  });

  test("keeps the address when Enter is pressed in the password field", async ({
    activeWorker,
    signedInPage: page,
  }) => {
    const emailPage = createPersonalEmailPage(page);
    const profilePage = createProfilePage(page);
    await emailPage.goTo();
    await emailPage.fillPassword(activeWorker.password);

    await emailPage.submitWithEnter();

    await expect(page).toHaveURL(PATHS.PROFILE.ROOT, {
      timeout: E2E_TIMEOUT_MS.POST_SUBMIT,
    });
    await expect(profilePage.getNotice()).toContainText(
      E2E_PERSONAL_EMAIL_COPY.SAVED_NOTICE
    );
    expect(
      await readWorkerPersonalEmail(activeWorker.id)
    ).toBe(E2E_PERSONAL_EMAIL_ADDRESS.EXISTING);
  });
});

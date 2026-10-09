import { STRING } from "@/app/constants";
import {
  E2E_PERSONAL_EMAIL_ERROR_COPY,
  E2E_PERSONAL_EMAIL_REQUESTS,
} from "../constants/E2ePersonalEmail.constants";
import { createPersonalEmailPage } from "../pages/PersonalEmail.page";
import { expect, test } from "@playwright/test";
import { signInAsSeededWorker } from "../support/signInAsSeededWorker";
import { trackPostRequests } from "../support/trackPostRequests";

test.describe("Personal email administration rules", () => {
  test.beforeEach(async ({ page }) => {
    await signInAsSeededWorker(page);
  });

  test("offers no Quitar button to the administration account", async ({
    page,
  }) => {
    const emailPage = createPersonalEmailPage(page);

    await emailPage.goTo();

    await expect(emailPage.getHeading()).toBeVisible();
    await expect(emailPage.getEmailInput()).not.toHaveValue(
      STRING.Empty
    );
    await expect(emailPage.getRemoveButton()).toHaveCount(
      0
    );
  });

  test("explains that administration needs an email when the field is emptied, without a request", async ({
    page,
  }) => {
    const emailPage = createPersonalEmailPage(page);
    const posts = trackPostRequests(page);
    await emailPage.goTo();
    await emailPage.fillEmail(STRING.Empty);

    await emailPage.save();

    await expect(emailPage.getEmailError()).toHaveText(
      E2E_PERSONAL_EMAIL_ERROR_COPY.ADMINISTRATION_REQUIRED
    );
    expect(posts.count()).toBe(
      E2E_PERSONAL_EMAIL_REQUESTS.NONE
    );
  });
});

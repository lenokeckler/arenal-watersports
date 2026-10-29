import { STRING } from "@/app/constants";
import { E2E_PERSONAL_EMAIL_ERROR_COPY } from "../constants/E2ePersonalEmail.constants";
import { E2E_COUNT } from "../constants/E2eRuntime.constants";
import { createPersonalEmailPage } from "../pages/PersonalEmail.page";
import { expect, test } from "@playwright/test";
import { signInAsSeededWorker } from "../support/signInAsSeededWorker";
import { trackPostRequests } from "../support/trackPostRequests";
import { waitForNetworkIdle } from "../support/waitForNetworkIdle";

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
    await expect(emailPage.getRemoveButton()).toBeHidden();
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
    await waitForNetworkIdle(page);
    expect(posts.count()).toBe(E2E_COUNT.NONE);
  });
});

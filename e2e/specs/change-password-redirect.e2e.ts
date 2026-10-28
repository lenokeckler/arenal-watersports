import { PATHS } from "@/app/constants";
import { createProfilePasswordPage } from "../pages/ProfilePassword.page";
import { expect, test } from "../support/activeWorkerTest";

test.describe("Change password well-known address", () => {
  test("opens the profile password form for a signed-in worker", async ({
    signedInPage: page,
  }) => {
    const passwordPage = createProfilePasswordPage(page);

    await passwordPage.goToWellKnownChangePassword();

    await expect(page).toHaveURL(PATHS.PROFILE.PASSWORD);
    await expect(passwordPage.getHeading()).toBeVisible();
  });

  test("sends a signed-out visitor to the login", async ({
    page,
  }) => {
    const passwordPage = createProfilePasswordPage(page);

    await passwordPage.goToWellKnownChangePassword();

    await expect(page).toHaveURL(PATHS.ACCESS.LOGIN);
  });
});

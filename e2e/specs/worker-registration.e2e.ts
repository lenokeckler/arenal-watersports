import { expect, test as base } from "@playwright/test";
import { PATHS } from "@/app/constants";
import {
  E2E_NEW_WORKER,
  E2E_WORKER_REGISTRATION_ERROR,
} from "../constants/E2eWorkerRegistration.constants";
import { createLoginPage } from "../pages/Login.page";
import { createWorkerRegistrationPage } from "../pages/WorkerRegistration.page";
import { test as activeWorkerTest } from "../support/activeWorkerTest";
import { buildE2eUsername } from "../support/buildE2eUsername";
import { removeRegisteredWorker } from "../support/removeRegisteredWorker";
import { signInAsSeededWorker } from "../support/signInAsSeededWorker";

const test = base.extend<{ newUsername: string }>({
  newUsername: async ({ context }, provide) => {
    const username = buildE2eUsername();

    await provide(username);
    await context.clearCookies();
    await removeRegisteredWorker(username);
  },
});

base.describe("Worker registration", () => {
  test("administration registers a worker who must change the temporary password on the first sign-in", async ({
    context,
    newUsername,
    page,
  }) => {
    const registrationPage =
      createWorkerRegistrationPage(page);
    const loginPage = createLoginPage(page);
    await signInAsSeededWorker(page);
    await registrationPage.goTo();

    await registrationPage.register({
      baseRole: E2E_NEW_WORKER.BASE_ROLE,
      fullName: E2E_NEW_WORKER.FULL_NAME,
      username: newUsername,
    });

    await expect(
      registrationPage.getRegisteredNotice(
        E2E_NEW_WORKER.FULL_NAME,
        newUsername
      )
    ).toBeVisible();
    const temporaryPassword = await registrationPage
      .getTemporaryPassword()
      .innerText();
    await context.clearCookies();
    await loginPage.goTo();
    await loginPage.fillUsername(newUsername);
    await loginPage.fillPassword(temporaryPassword);
    await loginPage.submit();
    await expect(page).toHaveURL(
      PATHS.ACCESS.FIRST_SIGN_IN
    );
  });

  base(
    "refuses a taken username on its field and empty fields on theirs",
    async ({ page }) => {
      const registrationPage =
        createWorkerRegistrationPage(page);
      await signInAsSeededWorker(page);
      await registrationPage.goTo();

      await registrationPage.submit();
      await expect(
        registrationPage.getMessage(
          E2E_WORKER_REGISTRATION_ERROR.FULL_NAME_REQUIRED
        )
      ).toBeVisible();
      await expect(
        registrationPage.getMessage(
          E2E_WORKER_REGISTRATION_ERROR.BASE_ROLE_REQUIRED
        )
      ).toBeVisible();
      await expect(
        registrationPage.getFullNameInput()
      ).toBeFocused();

      await registrationPage.register({
        baseRole: E2E_NEW_WORKER.BASE_ROLE,
        fullName: E2E_NEW_WORKER.FULL_NAME,
        username: E2E_NEW_WORKER.TAKEN_USERNAME,
      });
      await expect(
        registrationPage.getMessage(
          E2E_WORKER_REGISTRATION_ERROR.USERNAME_TAKEN
        )
      ).toBeVisible();
    }
  );
});

activeWorkerTest.describe(
  "Worker registration access",
  () => {
    activeWorkerTest(
      "sends a worker who is not administration to the home",
      async ({ signedInPage: page }) => {
        await createWorkerRegistrationPage(page).goTo();

        await expect(page).toHaveURL(PATHS.HOME);
      }
    );
  }
);

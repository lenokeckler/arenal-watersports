import { expect, test as base } from "@playwright/test";
import {
  E2E_NEW_WORKER,
  E2E_WORKER_REGISTRATION_ERROR,
  E2E_WORKER_REGISTRATION_SCREENSHOT_BASENAME,
} from "../constants/E2eWorkerRegistration.constants";
import { createWorkerRegistrationPage } from "../pages/WorkerRegistration.page";
import { buildE2eUsername } from "../support/buildE2eUsername";
import { captureFullPage } from "../support/captureFullPage";
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

base.describe("Worker registration screenshots", () => {
  base(
    "captures the empty form",
    async ({ page }, testInfo) => {
      const registrationPage =
        createWorkerRegistrationPage(page);
      await signInAsSeededWorker(page);
      await registrationPage.goTo();
      await expect(
        registrationPage.getHeading()
      ).toBeVisible();

      await captureFullPage(
        page,
        E2E_WORKER_REGISTRATION_SCREENSHOT_BASENAME.EMPTY_FORM,
        testInfo.project.name
      );
    }
  );

  base(
    "captures the field errors",
    async ({ page }, testInfo) => {
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

      await captureFullPage(
        page,
        E2E_WORKER_REGISTRATION_SCREENSHOT_BASENAME.FIELD_ERRORS,
        testInfo.project.name
      );
    }
  );

  test("captures the registered worker with the temporary password", async ({
    newUsername,
    page,
  }, testInfo) => {
    const registrationPage =
      createWorkerRegistrationPage(page);
    await signInAsSeededWorker(page);
    await registrationPage.goTo();

    await registrationPage.register({
      baseRole: E2E_NEW_WORKER.BASE_ROLE,
      fullName: E2E_NEW_WORKER.FULL_NAME,
      username: newUsername,
    });
    await expect(
      registrationPage.getTemporaryPassword()
    ).toBeVisible();

    await captureFullPage(
      page,
      E2E_WORKER_REGISTRATION_SCREENSHOT_BASENAME.REGISTERED,
      testInfo.project.name
    );
  });
});

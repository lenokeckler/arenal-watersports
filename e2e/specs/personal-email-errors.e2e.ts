import { STRING } from "@/app/constants";
import { E2E_ACTIVE_WORKER_ATTEMPTS } from "../constants/E2eActiveWorker.constants";
import {
  E2E_PERSONAL_EMAIL_ADDRESS,
  E2E_PERSONAL_EMAIL_ERROR_COPY,
  E2E_PERSONAL_EMAIL_PASSWORD,
} from "../constants/E2ePersonalEmail.constants";
import { E2E_COUNT } from "../constants/E2eRuntime.constants";
import { createPersonalEmailPage } from "../pages/PersonalEmail.page";
import { expect, test } from "../support/activeWorkerTest";
import { readWorkerAccountState } from "../support/readWorkerAccountState";
import { trackPostRequests } from "../support/trackPostRequests";
import { waitForNetworkIdle } from "../support/waitForNetworkIdle";

test.describe("Personal email errors", () => {
  test("rejects an invalid address without a request or an attempt", async ({
    activeWorker,
    signedInPage: page,
  }) => {
    const emailPage = createPersonalEmailPage(page);
    const posts = trackPostRequests(page);
    await emailPage.goTo();
    await emailPage.fillEmail(
      E2E_PERSONAL_EMAIL_ADDRESS.INVALID
    );
    await emailPage.fillPassword(activeWorker.password);

    await emailPage.save();

    await expect(emailPage.getEmailError()).toHaveText(
      E2E_PERSONAL_EMAIL_ERROR_COPY.EMAIL_INVALID
    );
    await waitForNetworkIdle(page);
    expect(posts.count()).toBe(E2E_COUNT.NONE);
    const { failedAttempts } = await readWorkerAccountState(
      activeWorker.id
    );
    expect(failedAttempts).toBe(
      E2E_ACTIVE_WORKER_ATTEMPTS.NONE
    );
  });

  test("rejects an address that is too long without a request", async ({
    activeWorker,
    signedInPage: page,
  }) => {
    const emailPage = createPersonalEmailPage(page);
    const posts = trackPostRequests(page);
    await emailPage.goTo();
    await emailPage.fillEmail(
      E2E_PERSONAL_EMAIL_ADDRESS.TOO_LONG
    );
    await emailPage.fillPassword(activeWorker.password);

    await emailPage.save();

    await expect(emailPage.getEmailError()).toHaveText(
      E2E_PERSONAL_EMAIL_ERROR_COPY.EMAIL_TOO_LONG
    );
    await waitForNetworkIdle(page);
    expect(posts.count()).toBe(E2E_COUNT.NONE);
  });

  test("asks for an address when none is registered", async ({
    activeWorker,
    signedInPage: page,
  }) => {
    const emailPage = createPersonalEmailPage(page);
    const posts = trackPostRequests(page);
    await emailPage.goTo();
    await emailPage.fillPassword(activeWorker.password);

    await emailPage.save();

    await expect(emailPage.getEmailError()).toHaveText(
      E2E_PERSONAL_EMAIL_ERROR_COPY.EMAIL_REQUIRED_UNREGISTERED
    );
    await waitForNetworkIdle(page);
    expect(posts.count()).toBe(E2E_COUNT.NONE);
  });

  test("rejects a wrong password, clears it, keeps the address and counts one attempt", async ({
    activeWorker,
    signedInPage: page,
  }) => {
    const emailPage = createPersonalEmailPage(page);
    await emailPage.goTo();
    await emailPage.fillEmail(
      E2E_PERSONAL_EMAIL_ADDRESS.STORED
    );
    await emailPage.fillPassword(
      E2E_PERSONAL_EMAIL_PASSWORD.WRONG
    );

    await emailPage.save();

    await expect(emailPage.getPasswordError()).toHaveText(
      E2E_PERSONAL_EMAIL_ERROR_COPY.CURRENT_PASSWORD_INVALID
    );
    await expect(emailPage.getPasswordInput()).toHaveValue(
      STRING.Empty
    );
    await expect(emailPage.getEmailInput()).toHaveValue(
      E2E_PERSONAL_EMAIL_ADDRESS.STORED
    );
    const { failedAttempts } = await readWorkerAccountState(
      activeWorker.id
    );
    expect(failedAttempts).toBe(
      E2E_ACTIVE_WORKER_ATTEMPTS.ONE_FAILURE
    );
  });

  test.describe("with a registered address", () => {
    test.use({
      personalEmail: E2E_PERSONAL_EMAIL_ADDRESS.EXISTING,
    });

    test("points to Quitar correo when the field is emptied", async ({
      activeWorker,
      signedInPage: page,
    }) => {
      const emailPage = createPersonalEmailPage(page);
      const posts = trackPostRequests(page);
      await emailPage.goTo();
      await emailPage.fillEmail(STRING.Empty);
      await emailPage.fillPassword(activeWorker.password);

      await emailPage.save();

      await expect(emailPage.getEmailError()).toHaveText(
        E2E_PERSONAL_EMAIL_ERROR_COPY.EMAIL_REQUIRED_REGISTERED
      );
      await waitForNetworkIdle(page);
      expect(posts.count()).toBe(E2E_COUNT.NONE);
    });
  });
});

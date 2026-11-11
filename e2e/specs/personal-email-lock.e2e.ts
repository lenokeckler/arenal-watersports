import { PATHS } from "@/app/constants";
import {
  E2E_ACTIVE_WORKER_ATTEMPTS,
  E2E_OPEN_SESSIONS,
} from "../constants/E2eActiveWorker.constants";
import {
  E2E_PERSONAL_EMAIL_ADDRESS,
  E2E_PERSONAL_EMAIL_PASSWORD,
} from "../constants/E2ePersonalEmail.constants";
import { E2E_TIMEOUT_MS } from "../constants/E2eRuntime.constants";
import {
  E2E_BLOCKED_ACCOUNT_STATUS,
  E2E_BLOCKED_BY_ATTEMPTS_LOGIN_PATH,
} from "../constants/E2eProfile.constants";
import { createPersonalEmailPage } from "../pages/PersonalEmail.page";
import { expect, test } from "../support/activeWorkerTest";
import { countAuthSessions } from "../support/countAuthSessions";
import { readWorkerAccountState } from "../support/readWorkerAccountState";
import { setWorkerFailedAttempts } from "../support/setWorkerFailedAttempts";

test.describe("Personal email lock", () => {
  test("blocks the account on the last wrong password and closes every session", async ({
    activeWorker,
    signedInPage: page,
  }) => {
    await setWorkerFailedAttempts(
      activeWorker.id,
      E2E_ACTIVE_WORKER_ATTEMPTS.JUST_BELOW_LOCK
    );
    const emailPage = createPersonalEmailPage(page);
    await emailPage.goTo();
    await emailPage.fillEmail(
      E2E_PERSONAL_EMAIL_ADDRESS.STORED
    );
    await emailPage.fillPassword(
      E2E_PERSONAL_EMAIL_PASSWORD.WRONG
    );

    await emailPage.save();

    await expect(page).toHaveURL(
      E2E_BLOCKED_BY_ATTEMPTS_LOGIN_PATH,
      { timeout: E2E_TIMEOUT_MS.POST_SUBMIT }
    );
    expect(await countAuthSessions(activeWorker.id)).toBe(
      E2E_OPEN_SESSIONS.AFTER_BLOCK
    );
    await emailPage.goTo();
    await expect(page).toHaveURL(PATHS.ACCESS.LOGIN);
    const { failedAttempts, status } =
      await readWorkerAccountState(activeWorker.id);
    expect(status).toBe(E2E_BLOCKED_ACCOUNT_STATUS);
    expect(failedAttempts).toBe(
      E2E_ACTIVE_WORKER_ATTEMPTS.LOCKED
    );
  });
});

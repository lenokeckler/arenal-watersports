import type { Page } from "@playwright/test";
import { E2E_SIGN_IN_ATTEMPT_LIMIT } from "../constants/E2eAdminRecovery.constants";
import { createLoginPage } from "../pages/Login.page";
import { setWorkerFailedAttempts } from "./setWorkerFailedAttempts";

export const openLoginAtAttemptLimit = async (
  page: Page,
  workerId: string
): Promise<void> => {
  await setWorkerFailedAttempts(
    workerId,
    E2E_SIGN_IN_ATTEMPT_LIMIT
  );
  await createLoginPage(page).goTo();
};

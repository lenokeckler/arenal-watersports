import type { Page } from "@playwright/test";
import { E2E_LOGIN_ACCOUNT } from "../constants/E2eLogin.constants";
import { openLoginAtAttemptLimit } from "./openLoginAtAttemptLimit";
import { submitLoginCredentials } from "./submitLoginCredentials";

export const submitRightPasswordAtLimit = async (
  page: Page,
  workerId: string
): Promise<void> => {
  await openLoginAtAttemptLimit(page, workerId);
  await submitLoginCredentials(
    page,
    E2E_LOGIN_ACCOUNT.USERNAME,
    E2E_LOGIN_ACCOUNT.PASSWORD
  );
};

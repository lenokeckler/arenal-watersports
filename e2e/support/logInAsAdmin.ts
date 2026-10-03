import type { BrowserContext } from "@playwright/test";
import { E2E_ADMIN_ACCOUNT } from "../constants/E2eAccounts.constants";
import { authenticateAs } from "./authenticateAs";

export const logInAsAdmin = (
  context: BrowserContext
): Promise<void> =>
  authenticateAs(context, E2E_ADMIN_ACCOUNT);

import type {
  BrowserContext,
  Page,
} from "@playwright/test";
import { expect } from "@playwright/test";
import { E2E_COUNT } from "../constants/E2eRuntime.constants";
import { E2E_LOGOUT_OFFLINE } from "../constants/E2eLogoutOffline.constants";
import { readAuthCookies } from "./readAuthCookies";

export const expectAuthCookiesGoneAfterRetries = async (
  page: Page,
  context: BrowserContext
): Promise<void> => {
  await expect
    .configure({ soft: true })
    .poll(async () => {
      await page.clock.runFor(
        E2E_LOGOUT_OFFLINE.BACKOFF_SKIP_MS
      );

      return (await readAuthCookies(context)).length;
    })
    .toBe(E2E_COUNT.NONE);
};

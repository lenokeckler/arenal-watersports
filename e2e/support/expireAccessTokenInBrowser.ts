import type {
  BrowserContext,
  Page,
} from "@playwright/test";
import { E2E_LOGOUT_OFFLINE } from "../constants/E2eLogoutOffline.constants";
import { readAccessTokenExpiry } from "./readAccessTokenExpiry";
import { readAuthCookies } from "./readAuthCookies";

export const expireAccessTokenInBrowser = async (
  page: Page,
  context: BrowserContext
): Promise<void> => {
  const expiry = await readAccessTokenExpiry(
    await readAuthCookies(context)
  );

  await page.clock.install();
  await page.clock.setSystemTime(
    expiry.getTime() + E2E_LOGOUT_OFFLINE.PAST_EXPIRY_MS
  );
};

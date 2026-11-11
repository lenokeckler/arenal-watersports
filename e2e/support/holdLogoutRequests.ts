import type { Page } from "@playwright/test";
import { E2E_LOGOUT_ENDPOINT } from "../constants/E2eLogoutResilience.constants";
import type { LogoutRequestHold } from "./models/LogoutRequestHold.interface";

export const holdLogoutRequests = async (
  page: Page
): Promise<LogoutRequestHold> => {
  let release: () => void = () => undefined;
  const released = new Promise<void>((resolve) => {
    release = resolve;
  });

  await page.route(
    E2E_LOGOUT_ENDPOINT.ROUTE_PATTERN,
    async (route) => {
      await released;
      await route.continue();
    }
  );

  return { release };
};

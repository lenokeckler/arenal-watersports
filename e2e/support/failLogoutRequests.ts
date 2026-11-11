import type { Page } from "@playwright/test";
import { HTTP_STATUS } from "@/app/constants";
import { E2E_LOGOUT_ENDPOINT } from "../constants/E2eLogoutResilience.constants";

export const failLogoutRequests = async (
  page: Page
): Promise<void> => {
  await page.route(
    E2E_LOGOUT_ENDPOINT.ROUTE_PATTERN,
    (route) =>
      route.fulfill({
        status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      })
  );
};

import type { Page } from "@playwright/test";
import { E2E_LOGOUT_ENDPOINT } from "../constants/E2eLogoutResilience.constants";
import { E2E_PAGE_EVENT } from "../constants/E2eRuntime.constants";
import type { LogoutRequestTracker } from "./models/LogoutRequestTracker.interface";

export const trackLogoutRequests = (
  page: Page
): LogoutRequestTracker => {
  let requestCount = 0;

  page.on(E2E_PAGE_EVENT.REQUEST, (request) => {
    if (
      request
        .url()
        .includes(E2E_LOGOUT_ENDPOINT.URL_FRAGMENT)
    ) {
      requestCount += 1;
    }
  });

  return { count: () => requestCount };
};

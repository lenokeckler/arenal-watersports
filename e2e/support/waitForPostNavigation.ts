import type { Page, Request } from "@playwright/test";
import { API } from "@/app/constants";

export const waitForPostNavigation = (
  page: Page
): Promise<Request> =>
  page.waitForRequest(
    (request) =>
      request.isNavigationRequest() &&
      request.method() === API.METHODS.POST
  );

import type { Page } from "@playwright/test";
import { E2E_PAGE_EVENT } from "../constants/E2eRuntime.constants";
import type { NavigationUrlTracker } from "./models/NavigationUrlTracker.interface";

export const trackNavigationUrls = (
  page: Page
): NavigationUrlTracker => {
  const seen: string[] = [];

  page.on(E2E_PAGE_EVENT.REQUEST, (request) => {
    if (request.isNavigationRequest()) {
      seen.push(request.url());
    }
  });

  return { urls: () => [...seen] };
};

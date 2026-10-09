import type { Page } from "@playwright/test";
import type { PostRequestTracker } from "./models/PostRequestTracker.interface";
import { API } from "@/app/constants";
import { E2E_PAGE_EVENT } from "../constants/E2eRuntime.constants";

export const trackPostRequests = (
  page: Page
): PostRequestTracker => {
  let postCount = 0;

  page.on(E2E_PAGE_EVENT.REQUEST, (request) => {
    if (request.method() === API.METHODS.POST) {
      postCount += 1;
    }
  });

  return { count: () => postCount };
};

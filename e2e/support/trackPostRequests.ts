import type { Page } from "@playwright/test";
import type { PostRequestTracker } from "./models/PostRequestTracker.interface";
import { E2E_HTTP_METHOD } from "../constants/E2ePersonalEmail.constants";

export const trackPostRequests = (
  page: Page
): PostRequestTracker => {
  let postCount = 0;

  page.on("request", (request) => {
    if (request.method() === E2E_HTTP_METHOD.POST) {
      postCount += 1;
    }
  });

  return { count: () => postCount };
};

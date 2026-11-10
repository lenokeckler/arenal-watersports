import type { Page } from "@playwright/test";
import type { PostRequestTracker } from "./models/PostRequestTracker.interface";
import { API } from "@/app/constants";
import {
  E2E_BASE_URL,
  E2E_PAGE_EVENT,
} from "../constants/E2eRuntime.constants";

const APP_ORIGIN = new URL(E2E_BASE_URL).origin;

export const trackPostRequests = (
  page: Page
): PostRequestTracker => {
  let postCount = 0;

  page.on(E2E_PAGE_EVENT.REQUEST, (request) => {
    if (
      request.method() === API.METHODS.POST &&
      new URL(request.url()).origin === APP_ORIGIN
    ) {
      postCount += 1;
    }
  });

  return { count: () => postCount };
};

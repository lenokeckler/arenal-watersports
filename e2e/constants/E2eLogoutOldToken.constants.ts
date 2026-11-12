import { PATHS } from "@/app/constants";
import { E2E_SYSTEM_ROUTES } from "./E2eSessionBarPresence.constants";

export const E2E_PROXY_GUARDED_ROUTES = [
  PATHS.HOME,
  PATHS.PROFILE.ROOT,
] as const;

export const E2E_PAGE_GUARDED_ROUTES =
  E2E_SYSTEM_ROUTES.filter(
    (route) =>
      !E2E_PROXY_GUARDED_ROUTES.some(
        (guarded) => guarded === route
      )
  );

export const E2E_OLD_TOKEN_SCENARIO = {
  PAGE_GUARDED:
    "still redirect to the login (the page cannot read the worker either)",
  PROXY_GUARDED: "are refused by the proxy",
} as const;

export const E2E_ACCESS_TOKEN = {
  MS_PER_SECOND: 1000,
  PAYLOAD_INDEX: 1,
  SEPARATOR: ".",
} as const;

export const E2E_ACCESS_TOKEN_ERROR = {
  MISSING: "the auth cookies hold no access token",
  NO_PAYLOAD: "the access token has no payload segment",
  NO_EXPIRY: "the access token carries no expiry",
  READ_OPERATION:
    "read the access token expiry from the auth cookies",
} as const;

import { PROTECTED_PATHNAME } from "./resolveProxyRedirect.constants";

export const PROXY_FIXTURE = {
  ORIGIN: "http://localhost:3000",
  LOCATION_HEADER: "location",
  PROTECTED_PATHNAME,
  SLASH_VARIANT_FIRST_SIGN_IN_PATHNAME:
    "/access/first-sign-in/",
  COOKIE: { name: "sb-access-token", value: "refreshed" },
} as const;

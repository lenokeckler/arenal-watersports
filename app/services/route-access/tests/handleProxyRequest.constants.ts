import { PROTECTED_PATHNAME } from "./resolveProxyRedirect.constants";

export const PROXY_FIXTURE = {
  ORIGIN: "http://localhost:3000",
  LOCATION_HEADER: "location",
  PROTECTED_PATHNAME,
  COOKIE: { name: "sb-access-token", value: "refreshed" },
} as const;

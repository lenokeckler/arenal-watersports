import type { HttpHeader } from "../../types/HttpHeader";

export const ALL_ROUTES_SOURCE = "/:path*";

export const SECURITY_HEADER_VALUE_BY_NAME = {
  "Content-Security-Policy": "frame-ancestors 'none'",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Permissions-Policy":
    "camera=(self), geolocation=(), microphone=()",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Strict-Transport-Security":
    "max-age=63072000; includeSubDomains",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
} as const;

export const SECURITY_HEADERS: HttpHeader[] =
  Object.entries(SECURITY_HEADER_VALUE_BY_NAME).map(
    ([key, value]) => ({ key, value })
  );

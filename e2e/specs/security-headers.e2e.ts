import { expect, test } from "@playwright/test";
import { SECURITY_HEADERS } from "@/app/constants/security/SecurityHeaders.constants";
import {
  E2E_REMOVED_HEADER,
  E2E_SECURITY_HEADER_PATHS,
} from "../constants/E2eSecurityHeaders.constants";
import { createSecurityHeadersPage } from "../pages/SecurityHeaders.page";

test.describe("Security headers", () => {
  for (const path of E2E_SECURITY_HEADER_PATHS) {
    test(`sends every security header on ${path}`, async ({
      request,
    }) => {
      const headers =
        await createSecurityHeadersPage(
          request
        ).fetchHeaders(path);

      for (const { key, value } of SECURITY_HEADERS) {
        expect(headers[key.toLowerCase()]).toBe(value);
      }
    });

    test(`does not reveal the framework on ${path}`, async ({
      request,
    }) => {
      const headers =
        await createSecurityHeadersPage(
          request
        ).fetchHeaders(path);

      expect(headers[E2E_REMOVED_HEADER]).toBeUndefined();
    });
  }
});

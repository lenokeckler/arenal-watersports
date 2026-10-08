import { describe, expect, it } from "vitest";
import { canonicalizePathname } from "@/app/utils/pathname/canonicalizePathname";
import { resolveProxyRedirect } from "../resolveProxyRedirect";
import { GATE_MATRIX } from "./resolveProxyRedirect.constants";

describe("resolveProxyRedirect after canonicalizing the pathname", () => {
  it.each(GATE_MATRIX)(
    "for session %j at %s redirects to %s",
    (session, pathname, expectedRedirect) => {
      expect(
        resolveProxyRedirect(
          canonicalizePathname(pathname),
          session
        )
      ).toBe(expectedRedirect);
    }
  );
});

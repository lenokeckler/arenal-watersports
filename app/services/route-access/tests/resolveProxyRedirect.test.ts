import { describe, expect, it } from "vitest";
import { resolveProxyRedirect } from "../resolveProxyRedirect";
import { GATE_MATRIX } from "./resolveProxyRedirect.constants";

describe("resolveProxyRedirect", () => {
  it.each(GATE_MATRIX)(
    "for session %j at %s redirects to %s",
    (session, pathname, expectedRedirect) => {
      expect(resolveProxyRedirect(pathname, session)).toBe(
        expectedRedirect
      );
    }
  );
});

import { describe, expect, it } from "vitest";
import { PATHS } from "@/app/constants";
import { resolveProxyRedirect } from "../resolveProxyRedirect";
import {
  PRE_LOGIN_PATHS,
  PROTECTED_PATHS,
} from "./resolveProxyRedirect.constants";

describe("resolveProxyRedirect", () => {
  it.each(PROTECTED_PATHS)(
    "sends a signed-out visitor of %s to the login",
    (pathname) => {
      expect(resolveProxyRedirect(pathname, false)).toBe(
        PATHS.ACCESS.LOGIN
      );
    }
  );

  it.each(PRE_LOGIN_PATHS)(
    "keeps the pre-login route %s reachable without a session",
    (pathname) => {
      expect(
        resolveProxyRedirect(pathname, false)
      ).toBeNull();
    }
  );

  it.each([...PROTECTED_PATHS, ...PRE_LOGIN_PATHS])(
    "lets a signed-in visitor through %s",
    (pathname) => {
      expect(
        resolveProxyRedirect(pathname, true)
      ).toBeNull();
    }
  );
});

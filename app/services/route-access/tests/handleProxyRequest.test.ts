import { NextRequest, NextResponse } from "next/server";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { PATHS } from "@/app/constants";
import { handleProxyRequest } from "../handleProxyRequest";
import type { SessionAccess } from "@/app/services/supabase/models/SessionAccess.interface";
import { PROXY_FIXTURE } from "./handleProxyRequest.constants";
import {
  PENDING_PASSWORD,
  SIGNED_IN,
  SIGNED_OUT,
  SIGNED_OUT_WITH_PENDING_CLAIM,
} from "./resolveProxyRedirect.constants";

const { refreshSupabaseSession } = vi.hoisted(() => ({
  refreshSupabaseSession: vi.fn(),
}));

vi.mock("@/app/services/supabase/refreshSession", () => ({
  refreshSupabaseSession,
}));

const buildRequest = (pathname: string): NextRequest =>
  new NextRequest(`${PROXY_FIXTURE.ORIGIN}${pathname}`);

const givenRefresh = (
  session: SessionAccess
): NextResponse => {
  const response = NextResponse.next();
  response.cookies.set(
    PROXY_FIXTURE.COOKIE.name,
    PROXY_FIXTURE.COOKIE.value
  );
  refreshSupabaseSession.mockResolvedValue({
    ...session,
    response,
  });
  return response;
};

describe("handleProxyRequest", () => {
  beforeEach(() => {
    refreshSupabaseSession.mockReset();
  });

  it("redirects a signed-out visitor to the login and keeps the refreshed cookies", async () => {
    givenRefresh(SIGNED_OUT);

    const result = await handleProxyRequest(
      buildRequest(PROXY_FIXTURE.PROTECTED_PATHNAME)
    );

    expect(
      result.headers.get(PROXY_FIXTURE.LOCATION_HEADER)
    ).toBe(`${PROXY_FIXTURE.ORIGIN}${PATHS.ACCESS.LOGIN}`);
    expect(
      result.cookies.get(PROXY_FIXTURE.COOKIE.name)?.value
    ).toBe(PROXY_FIXTURE.COOKIE.value);
  });

  it("returns the refreshed response for a signed-in visitor", async () => {
    const refreshed = givenRefresh(SIGNED_IN);

    const result = await handleProxyRequest(
      buildRequest(PROXY_FIXTURE.PROTECTED_PATHNAME)
    );

    expect(result).toBe(refreshed);
  });

  it("lets a signed-out visitor reach the login", async () => {
    const refreshed = givenRefresh(SIGNED_OUT);

    const result = await handleProxyRequest(
      buildRequest(PATHS.ACCESS.LOGIN)
    );

    expect(result).toBe(refreshed);
  });

  it("redirects a pending account to the first sign-in and keeps the refreshed cookies", async () => {
    givenRefresh(PENDING_PASSWORD);

    const result = await handleProxyRequest(
      buildRequest(PROXY_FIXTURE.PROTECTED_PATHNAME)
    );

    expect(
      result.headers.get(PROXY_FIXTURE.LOCATION_HEADER)
    ).toBe(
      `${PROXY_FIXTURE.ORIGIN}${PATHS.ACCESS.FIRST_SIGN_IN}`
    );
    expect(
      result.cookies.get(PROXY_FIXTURE.COOKIE.name)?.value
    ).toBe(PROXY_FIXTURE.COOKIE.value);
  });

  it("redirects a settled account away from the first sign-in and keeps the refreshed cookies", async () => {
    givenRefresh(SIGNED_IN);

    const result = await handleProxyRequest(
      buildRequest(PATHS.ACCESS.FIRST_SIGN_IN)
    );

    expect(
      result.headers.get(PROXY_FIXTURE.LOCATION_HEADER)
    ).toBe(`${PROXY_FIXTURE.ORIGIN}${PATHS.HOME}`);
    expect(
      result.cookies.get(PROXY_FIXTURE.COOKIE.name)?.value
    ).toBe(PROXY_FIXTURE.COOKIE.value);
  });

  it("lets a pending account stay on the first sign-in", async () => {
    const refreshed = givenRefresh(PENDING_PASSWORD);

    const result = await handleProxyRequest(
      buildRequest(PATHS.ACCESS.FIRST_SIGN_IN)
    );

    expect(result).toBe(refreshed);
  });

  it("sends a signed-out visitor on a slash variant of the first sign-in to the login", async () => {
    givenRefresh(SIGNED_OUT);

    const result = await handleProxyRequest(
      buildRequest(
        PROXY_FIXTURE.SLASH_VARIANT_FIRST_SIGN_IN_PATHNAME
      )
    );

    expect(
      result.headers.get(PROXY_FIXTURE.LOCATION_HEADER)
    ).toBe(`${PROXY_FIXTURE.ORIGIN}${PATHS.ACCESS.LOGIN}`);
  });

  it.each([
    PROXY_FIXTURE.PROTECTED_PATHNAME,
    PATHS.ACCESS.FIRST_SIGN_IN,
  ])(
    "sends a dead session that still claims a pending password change at %s to the login and keeps the refreshed cookies",
    async (pathname) => {
      givenRefresh(SIGNED_OUT_WITH_PENDING_CLAIM);

      const result = await handleProxyRequest(
        buildRequest(pathname)
      );

      expect(
        result.headers.get(PROXY_FIXTURE.LOCATION_HEADER)
      ).toBe(
        `${PROXY_FIXTURE.ORIGIN}${PATHS.ACCESS.LOGIN}`
      );
      expect(
        result.cookies.get(PROXY_FIXTURE.COOKIE.name)?.value
      ).toBe(PROXY_FIXTURE.COOKIE.value);
    }
  );
});

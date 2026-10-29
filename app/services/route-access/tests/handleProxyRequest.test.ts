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
import { PROXY_FIXTURE } from "./handleProxyRequest.constants";

const { refreshSupabaseSession } = vi.hoisted(() => ({
  refreshSupabaseSession: vi.fn(),
}));

vi.mock("@/app/services/supabase/refreshSession", () => ({
  refreshSupabaseSession,
}));

const buildRequest = (pathname: string): NextRequest =>
  new NextRequest(`${PROXY_FIXTURE.ORIGIN}${pathname}`);

const givenRefresh = (
  hasSession: boolean
): NextResponse => {
  const response = NextResponse.next();
  response.cookies.set(
    PROXY_FIXTURE.COOKIE.name,
    PROXY_FIXTURE.COOKIE.value
  );
  refreshSupabaseSession.mockResolvedValue({
    hasSession,
    response,
  });
  return response;
};

describe("handleProxyRequest", () => {
  beforeEach(() => {
    refreshSupabaseSession.mockReset();
  });

  it("redirects a signed-out visitor to the login and keeps the refreshed cookies", async () => {
    givenRefresh(false);

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
    const refreshed = givenRefresh(true);

    const result = await handleProxyRequest(
      buildRequest(PROXY_FIXTURE.PROTECTED_PATHNAME)
    );

    expect(result).toBe(refreshed);
  });

  it("lets a signed-out visitor reach the login", async () => {
    const refreshed = givenRefresh(false);

    const result = await handleProxyRequest(
      buildRequest(PATHS.ACCESS.LOGIN)
    );

    expect(result).toBe(refreshed);
  });
});

import { NextRequest } from "next/server";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { refreshSupabaseSession } from "../refreshSession";
import { SESSION_FIXTURE } from "./refreshSession.constants";

const { getClaims, createServerClient } = vi.hoisted(
  () => ({
    getClaims: vi.fn(),
    createServerClient: vi.fn(),
  })
);

vi.mock("@supabase/ssr", () => ({ createServerClient }));

type CookieAdapter = {
  getAll: () => { name: string; value: string }[];
  setAll: (
    cookies: {
      name: string;
      value: string;
      options: Record<string, unknown>;
    }[]
  ) => void;
};

const buildRequest = (): NextRequest =>
  new NextRequest(
    `${SESSION_FIXTURE.ORIGIN}${SESSION_FIXTURE.PATHNAME}`,
    {
      headers: {
        cookie: `${SESSION_FIXTURE.REQUEST_COOKIE.name}=${SESSION_FIXTURE.REQUEST_COOKIE.value}`,
      },
    }
  );

const capturedCookies = (): CookieAdapter =>
  createServerClient.mock.calls[0][2].cookies;

describe("refreshSupabaseSession", () => {
  beforeEach(() => {
    getClaims.mockReset();
    createServerClient.mockReset();
    createServerClient.mockReturnValue({
      auth: { getClaims },
    });
    getClaims.mockResolvedValue({
      data: null,
      error: null,
    });
  });

  it("reports a session when the token claims verify", async () => {
    getClaims.mockResolvedValue({
      data: { claims: SESSION_FIXTURE.CLAIMS },
      error: null,
    });

    const result =
      await refreshSupabaseSession(buildRequest());

    expect(result.hasSession).toBe(true);
  });

  it("reports no session when there are no claims", async () => {
    getClaims.mockResolvedValue({
      data: null,
      error: null,
    });

    const result =
      await refreshSupabaseSession(buildRequest());

    expect(result.hasSession).toBe(false);
  });

  it("fails closed when verification returns an error", async () => {
    getClaims.mockResolvedValue({
      data: { claims: SESSION_FIXTURE.CLAIMS },
      error: new Error(SESSION_FIXTURE.ERROR_MESSAGE),
    });

    const result =
      await refreshSupabaseSession(buildRequest());

    expect(result.hasSession).toBe(false);
  });

  it("reads the cookies of the incoming request", async () => {
    await refreshSupabaseSession(buildRequest());

    expect(capturedCookies().getAll()).toEqual([
      expect.objectContaining(
        SESSION_FIXTURE.REQUEST_COOKIE
      ),
    ]);
  });

  it("writes refreshed cookies to the request and the response", async () => {
    getClaims.mockImplementation(() => {
      capturedCookies().setAll([
        SESSION_FIXTURE.REFRESHED_COOKIE,
      ]);
      return Promise.resolve({ data: null, error: null });
    });
    const request = buildRequest();
    const { response } =
      await refreshSupabaseSession(request);

    const { name, value } =
      SESSION_FIXTURE.REFRESHED_COOKIE;
    expect(request.cookies.get(name)?.value).toBe(value);
    expect(response.cookies.get(name)?.value).toBe(value);
  });
});

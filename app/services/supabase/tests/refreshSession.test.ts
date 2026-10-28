import { NextRequest } from "next/server";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { refreshSupabaseSession } from "../refreshSession";
import type { CookieMethodsServer } from "@supabase/ssr";
import {
  SUPABASE_AUTH_COOKIE,
  SUPABASE_RPC,
} from "@/app/constants";
import { SESSION_FIXTURE } from "./refreshSession.constants";

const { getClaims, rpc, createServerClient } = vi.hoisted(
  () => ({
    getClaims: vi.fn(),
    rpc: vi.fn(),
    createServerClient: vi.fn(),
  })
);

vi.mock("@supabase/ssr", () => ({ createServerClient }));

const buildRequest = (): NextRequest =>
  new NextRequest(
    `${SESSION_FIXTURE.ORIGIN}${SESSION_FIXTURE.PATHNAME}`,
    {
      headers: {
        cookie: `${SESSION_FIXTURE.REQUEST_COOKIE.name}=${SESSION_FIXTURE.REQUEST_COOKIE.value}`,
      },
    }
  );

let sessionCookies: Required<CookieMethodsServer>;

const mockRpcAnswer = (answer: unknown): void => {
  rpc.mockReturnValue({
    abortSignal: vi.fn().mockResolvedValue(answer),
  });
};

describe("refreshSupabaseSession", () => {
  beforeEach(() => {
    getClaims.mockReset();
    rpc.mockReset();
    mockRpcAnswer({ data: true, error: null });
    createServerClient.mockReset();
    createServerClient.mockImplementation(
      (_url, _key, { cookies }) => {
        sessionCookies = cookies;
        return { auth: { getClaims }, rpc };
      }
    );
    getClaims.mockResolvedValue({
      data: null,
      error: null,
    });
  });

  it("names the auth cookie with the project constant", async () => {
    await refreshSupabaseSession(buildRequest());

    const options = createServerClient.mock.calls[0][2];
    expect(options.cookieOptions.name).toBe(
      SUPABASE_AUTH_COOKIE.NAME
    );
  });

  it("reports a session when the token claims verify", async () => {
    getClaims.mockResolvedValue({
      data: { claims: SESSION_FIXTURE.CLAIMS },
      error: null,
    });

    const result =
      await refreshSupabaseSession(buildRequest());

    expect(result.hasSession).toBe(true);
    expect(result.mustChangePassword).toBe(false);
  });

  it("asks the database whether the session of the claims is live", async () => {
    getClaims.mockResolvedValue({
      data: { claims: SESSION_FIXTURE.CLAIMS },
      error: null,
    });

    await refreshSupabaseSession(buildRequest());

    expect(rpc).toHaveBeenCalledTimes(1);
    expect(rpc).toHaveBeenCalledWith(
      SUPABASE_RPC.CURRENT_SESSION_IS_LIVE
    );
  });

  it("reports no session when the database says the session is gone", async () => {
    getClaims.mockResolvedValue({
      data: { claims: SESSION_FIXTURE.CLAIMS },
      error: null,
    });
    mockRpcAnswer({ data: false, error: null });

    const result =
      await refreshSupabaseSession(buildRequest());

    expect(result.hasSession).toBe(false);
  });

  it("keeps the session of the claims when the liveness check fails", async () => {
    getClaims.mockResolvedValue({
      data: { claims: SESSION_FIXTURE.CLAIMS },
      error: null,
    });
    mockRpcAnswer({
      data: null,
      error: new Error(SESSION_FIXTURE.ERROR_MESSAGE),
    });

    const result =
      await refreshSupabaseSession(buildRequest());

    expect(result.hasSession).toBe(true);
  });

  it("never asks the database when there are no claims", async () => {
    getClaims.mockResolvedValue({
      data: null,
      error: null,
    });

    await refreshSupabaseSession(buildRequest());

    expect(rpc).not.toHaveBeenCalled();
  });

  it("never asks the database when verification returns an error", async () => {
    getClaims.mockResolvedValue({
      data: { claims: SESSION_FIXTURE.CLAIMS },
      error: new Error(SESSION_FIXTURE.ERROR_MESSAGE),
    });

    await refreshSupabaseSession(buildRequest());

    expect(rpc).not.toHaveBeenCalled();
  });

  it("reports neither a session nor a password change for a dead session whose claims still ask for one", async () => {
    getClaims.mockResolvedValue({
      data: { claims: SESSION_FIXTURE.PENDING_CLAIMS },
      error: null,
    });
    mockRpcAnswer({ data: false, error: null });

    const result =
      await refreshSupabaseSession(buildRequest());

    expect(result.hasSession).toBe(false);
    expect(result.mustChangePassword).toBe(false);
  });

  it.each([
    ["true", SESSION_FIXTURE.PENDING_CLAIMS, true],
    ["false", SESSION_FIXTURE.SETTLED_CLAIMS, false],
    ["absent", SESSION_FIXTURE.CLAIMS, false],
    [
      "non-boolean",
      SESSION_FIXTURE.NON_BOOLEAN_CLAIMS,
      false,
    ],
  ])(
    "reads the password change claim when it is %s",
    async (_label, claims, expected) => {
      getClaims.mockResolvedValue({
        data: { claims },
        error: null,
      });

      const result =
        await refreshSupabaseSession(buildRequest());

      expect(result.mustChangePassword).toBe(expected);
    }
  );

  it("reports no session when there are no claims", async () => {
    getClaims.mockResolvedValue({
      data: null,
      error: null,
    });

    const result =
      await refreshSupabaseSession(buildRequest());

    expect(result.hasSession).toBe(false);
    expect(result.mustChangePassword).toBe(false);
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

  it("does not report a pending password change when verification returns an error", async () => {
    getClaims.mockResolvedValue({
      data: { claims: SESSION_FIXTURE.PENDING_CLAIMS },
      error: new Error(SESSION_FIXTURE.ERROR_MESSAGE),
    });

    const result =
      await refreshSupabaseSession(buildRequest());

    expect(result.mustChangePassword).toBe(false);
  });

  it("reads the cookies of the incoming request", async () => {
    await refreshSupabaseSession(buildRequest());

    expect(await sessionCookies.getAll()).toEqual([
      expect.objectContaining(
        SESSION_FIXTURE.REQUEST_COOKIE
      ),
    ]);
  });

  it("writes refreshed cookies to the request and the response", async () => {
    getClaims.mockImplementation(async () => {
      await sessionCookies.setAll([
        SESSION_FIXTURE.REFRESHED_COOKIE,
      ]);
      return { data: null, error: null };
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

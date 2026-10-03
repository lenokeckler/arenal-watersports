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

const { getClaims } = vi.hoisted(() => ({
  getClaims: vi.fn(),
}));

vi.mock("@supabase/ssr", () => ({
  createServerClient: () => ({ auth: { getClaims } }),
}));

const buildRequest = (): NextRequest =>
  new NextRequest(
    `${SESSION_FIXTURE.ORIGIN}${SESSION_FIXTURE.PATHNAME}`
  );

describe("refreshSupabaseSession", () => {
  beforeEach(() => {
    getClaims.mockReset();
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
});

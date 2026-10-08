import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { SESSION_CLAIM } from "@/app/constants";
import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import { refreshFirstSignInSession } from "../refreshFirstSignInSession";
import { NETWORK_ERROR } from "./mapSignInAuthError.constants";

const refreshSession = vi.fn();
const getClaims = vi.fn();
const supabase = {
  auth: { getClaims, refreshSession },
} as unknown as ServerSupabaseClient;

const claimsWith = (mustChangePassword: unknown) => ({
  data: {
    claims: {
      [SESSION_CLAIM.MUST_CHANGE_PASSWORD]:
        mustChangePassword,
    },
  },
  error: null,
});

describe("refreshFirstSignInSession", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    refreshSession.mockResolvedValue({ error: null });
    getClaims.mockResolvedValue(claimsWith(false));
  });

  it("resolves when the refreshed claims clear the change", async () => {
    await expect(
      refreshFirstSignInSession(supabase)
    ).resolves.toBeUndefined();

    expect(refreshSession).toHaveBeenCalledOnce();
  });

  it.each([
    ["still pending", true],
    ["missing", undefined],
  ])(
    "throws when the claim is %s",
    async (_name, claim) => {
      getClaims.mockResolvedValue(claimsWith(claim));

      await expect(
        refreshFirstSignInSession(supabase)
      ).rejects.toThrow();
    }
  );

  it("throws when the session cannot be refreshed", async () => {
    refreshSession.mockResolvedValue({
      error: NETWORK_ERROR,
    });

    await expect(
      refreshFirstSignInSession(supabase)
    ).rejects.toBe(NETWORK_ERROR);
    expect(getClaims).not.toHaveBeenCalled();
  });

  it("throws when the claims cannot be read", async () => {
    getClaims.mockResolvedValue({
      data: null,
      error: NETWORK_ERROR,
    });

    await expect(
      refreshFirstSignInSession(supabase)
    ).rejects.toBe(NETWORK_ERROR);
  });

  it("throws when no claims come back", async () => {
    getClaims.mockResolvedValue({
      data: null,
      error: null,
    });

    await expect(
      refreshFirstSignInSession(supabase)
    ).rejects.toThrow();
  });
});

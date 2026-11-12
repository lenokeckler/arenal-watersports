import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  SESSION_CLAIM,
  SESSION_REFRESH_ERROR_MESSAGE,
  SUPABASE_AUTH_OPERATION,
} from "@/app/constants";
import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import { SupabaseAuthOperationError } from "@/app/utils/supabase-error/SupabaseAuthError";
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
    [
      "still pending",
      true,
      SESSION_REFRESH_ERROR_MESSAGE.PENDING_CHANGE,
    ],
    [
      "missing",
      undefined,
      SESSION_REFRESH_ERROR_MESSAGE.PENDING_CHANGE,
    ],
  ])(
    "throws when the claim is %s",
    async (_name, claim, message) => {
      getClaims.mockResolvedValue(claimsWith(claim));

      await expect(
        refreshFirstSignInSession(supabase)
      ).rejects.toThrow(message);
    }
  );

  it.each([
    [
      "the session cannot be refreshed",
      SUPABASE_AUTH_OPERATION.REFRESH_SESSION,
      () =>
        refreshSession.mockResolvedValue({
          error: NETWORK_ERROR,
        }),
    ],
    [
      "the claims cannot be read",
      SUPABASE_AUTH_OPERATION.GET_CLAIMS,
      () =>
        getClaims.mockResolvedValue({
          data: null,
          error: NETWORK_ERROR,
        }),
    ],
  ])(
    "wraps the auth failure with its operation when %s",
    async (_name, operation, arrange) => {
      arrange();

      const failure = await refreshFirstSignInSession(
        supabase
      ).catch((error: Error) => error);

      expect(failure).toBeInstanceOf(
        SupabaseAuthOperationError
      );
      expect((failure as Error).message).toContain(
        operation
      );
      expect((failure as Error).message).not.toContain(
        NETWORK_ERROR.message
      );
      expect((failure as Error).cause).toBe(NETWORK_ERROR);
    }
  );

  it("stops before reading the claims when the refresh fails", async () => {
    refreshSession.mockResolvedValue({
      error: NETWORK_ERROR,
    });

    await expect(
      refreshFirstSignInSession(supabase)
    ).rejects.toThrow();
    expect(getClaims).not.toHaveBeenCalled();
  });

  it("throws when no claims come back", async () => {
    getClaims.mockResolvedValue({
      data: null,
      error: null,
    });

    await expect(
      refreshFirstSignInSession(supabase)
    ).rejects.toThrow(
      SESSION_REFRESH_ERROR_MESSAGE.MISSING_CLAIMS
    );
  });
});

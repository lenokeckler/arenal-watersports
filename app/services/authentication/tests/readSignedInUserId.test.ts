import { AuthSessionMissingError } from "@supabase/supabase-js";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import { SupabaseAuthOperationError } from "@/app/utils/supabase-error/SupabaseAuthError";
import { readSignedInUserId } from "../readSignedInUserId";
import { SIGNED_IN_USER_RESULT } from "./firstSignIn.constants";
import { NETWORK_ERROR } from "./mapSignInAuthError.constants";

const getUser = vi.fn();
const supabase = {
  auth: { getUser },
} as unknown as ServerSupabaseClient;

describe("readSignedInUserId", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    getUser.mockResolvedValue(SIGNED_IN_USER_RESULT);
  });

  it("returns the id of the signed-in user", async () => {
    await expect(
      readSignedInUserId(supabase)
    ).resolves.toBe(SIGNED_IN_USER_RESULT.data.user.id);
  });

  it.each([
    ["no signed-in user", null],
    ["a missing session", new AuthSessionMissingError()],
  ])("returns null for %s", async (_name, error) => {
    getUser.mockResolvedValue({
      data: { user: null },
      error,
    });

    await expect(
      readSignedInUserId(supabase)
    ).resolves.toBeNull();
  });

  it("throws when the user lookup fails", async () => {
    getUser.mockResolvedValue({
      data: { user: null },
      error: NETWORK_ERROR,
    });

    await expect(
      readSignedInUserId(supabase)
    ).rejects.toBeInstanceOf(SupabaseAuthOperationError);
  });
});

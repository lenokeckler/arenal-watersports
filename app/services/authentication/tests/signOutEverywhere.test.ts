import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { SUPABASE_SIGN_OUT_SCOPE } from "@/app/constants";
import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import { SupabaseAuthOperationError } from "@/app/utils/supabase-error/SupabaseAuthError";
import { signOutEverywhere } from "../signOutEverywhere";
import { captureArguments } from "./captureArguments";
import { NETWORK_ERROR } from "./mapSignInAuthError.constants";

const signOut = vi.fn();
const supabase = {
  auth: { signOut },
} as unknown as ServerSupabaseClient;

describe("signOutEverywhere", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    signOut.mockResolvedValue({ error: null });
  });

  it("closes the sessions of every device", async () => {
    const argumentsOf = captureArguments(signOut, [
      { error: null },
    ]);

    await expect(
      signOutEverywhere(supabase)
    ).resolves.toBeUndefined();

    expect(argumentsOf()).toEqual([
      [{ scope: SUPABASE_SIGN_OUT_SCOPE.GLOBAL }],
    ]);
  });

  it("throws when the sign-out fails so the caller never reports success", async () => {
    signOut.mockResolvedValue({ error: NETWORK_ERROR });

    await expect(
      signOutEverywhere(supabase)
    ).rejects.toBeInstanceOf(SupabaseAuthOperationError);
  });
});

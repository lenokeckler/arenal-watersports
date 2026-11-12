import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { PASSWORD_CHANGE_ERROR_CODE } from "@/app/constants";
import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import { DEFAULT_PASSWORD_CHANGE_INPUT } from "@/app/utils/password-change/tests/passwordChange.constants";
import { updateSignedInPassword } from "../updateSignedInPassword";
import { captureArguments } from "./captureArguments";
import { SAME_PASSWORD_ERROR } from "./passwordUpdateErrors.constants";

const NEW_PASSWORD =
  DEFAULT_PASSWORD_CHANGE_INPUT.newPassword;
const updateUser = vi.fn();
const supabase = {
  auth: { updateUser },
} as unknown as ServerSupabaseClient;

describe("updateSignedInPassword", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    updateUser.mockResolvedValue({ error: null });
  });

  it("updates the password of the signed-in user", async () => {
    const argumentsOf = captureArguments(updateUser, [
      { error: null },
    ]);

    await expect(
      updateSignedInPassword(supabase, NEW_PASSWORD)
    ).resolves.toBeNull();

    expect(argumentsOf()).toEqual([
      [{ password: NEW_PASSWORD }],
    ]);
  });

  it("returns the mapped error when the update is rejected", async () => {
    updateUser.mockResolvedValue({
      error: SAME_PASSWORD_ERROR,
    });

    const result = await updateSignedInPassword(
      supabase,
      NEW_PASSWORD
    );

    expect(result?.code).toBe(
      PASSWORD_CHANGE_ERROR_CODE.NEW_PASSWORD_SAME_AS_CURRENT
    );
    expect(JSON.stringify(result)).not.toContain(
      SAME_PASSWORD_ERROR.message
    );
  });
});

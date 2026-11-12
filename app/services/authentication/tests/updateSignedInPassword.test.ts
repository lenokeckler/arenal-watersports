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

const INPUT = DEFAULT_PASSWORD_CHANGE_INPUT;
const updateUser = vi.fn();
const supabase = {
  auth: { updateUser },
} as unknown as ServerSupabaseClient;

describe("updateSignedInPassword", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    updateUser.mockResolvedValue({ error: null });
  });

  it("sends the current password with the new one so Supabase accepts the change", async () => {
    const argumentsOf = captureArguments(updateUser, [
      { error: null },
    ]);

    await expect(
      updateSignedInPassword(supabase, INPUT)
    ).resolves.toBeNull();

    expect(argumentsOf()).toEqual([
      [
        {
          current_password: INPUT.currentPassword,
          password: INPUT.newPassword,
        },
      ],
    ]);
  });

  it("returns the mapped error when the update is rejected", async () => {
    updateUser.mockResolvedValue({
      error: SAME_PASSWORD_ERROR,
    });

    const result = await updateSignedInPassword(
      supabase,
      INPUT
    );

    expect(result?.code).toBe(
      PASSWORD_CHANGE_ERROR_CODE.NEW_PASSWORD_SAME_AS_CURRENT
    );
    expect(JSON.stringify(result)).not.toContain(
      SAME_PASSWORD_ERROR.message
    );
  });
});

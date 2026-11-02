import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { PASSWORD_CHANGE_ERROR_CODE } from "@/app/constants";
import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import { DEFAULT_PASSWORD_CHANGE_INPUT as INPUT } from "@/app/utils/password-change/tests/passwordChange.constants";
import { updateOwnPassword } from "../updateOwnPassword";
import { captureArguments } from "./captureArguments";
import { CURRENT_PASSWORD_MISMATCH_ERROR } from "./passwordUpdateErrors.constants";

const updateUser = vi.fn();
const supabase = {
  auth: { updateUser },
} as unknown as ServerSupabaseClient;

describe("updateOwnPassword", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    updateUser.mockResolvedValue({ error: null });
  });

  it("sends the new and the current password and nothing else", async () => {
    const argumentsOf = captureArguments(updateUser, [
      { error: null },
    ]);

    await expect(
      updateOwnPassword(supabase, INPUT)
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

  it("returns the mapped error without leaking its message", async () => {
    updateUser.mockResolvedValue({
      error: CURRENT_PASSWORD_MISMATCH_ERROR,
    });

    const result = await updateOwnPassword(supabase, INPUT);

    expect(result?.code).toBe(
      PASSWORD_CHANGE_ERROR_CODE.CURRENT_PASSWORD_INVALID
    );
    expect(JSON.stringify(result)).not.toContain(
      CURRENT_PASSWORD_MISMATCH_ERROR.message
    );
  });
});

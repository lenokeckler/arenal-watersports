import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { FIRST_SIGN_IN_ERROR_CODE } from "@/app/constants";
import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import { DEFAULT_FIRST_PASSWORD_CHANGE_INPUT } from "@/app/utils/first-sign-in/tests/firstSignIn.constants";
import { updateSignedInPassword } from "../updateSignedInPassword";
import { SAME_PASSWORD_ERROR } from "./passwordUpdateErrors.constants";

const NEW_PASSWORD =
  DEFAULT_FIRST_PASSWORD_CHANGE_INPUT.newPassword;
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
    await expect(
      updateSignedInPassword(supabase, NEW_PASSWORD)
    ).resolves.toBeNull();

    expect(updateUser).toHaveBeenCalledOnce();
    expect(updateUser).toHaveBeenCalledWith({
      password: NEW_PASSWORD,
    });
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
      FIRST_SIGN_IN_ERROR_CODE.NEW_PASSWORD_SAME_AS_CURRENT
    );
    expect(JSON.stringify(result)).not.toContain(
      SAME_PASSWORD_ERROR.message
    );
  });
});

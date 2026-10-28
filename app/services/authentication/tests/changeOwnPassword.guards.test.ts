import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import "./changeOwnPassword.setup";
import {
  PASSWORD_CHANGE_ERROR_CODE,
  type PasswordChangeErrorCode,
} from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { createPasswordChangeError } from "@/app/utils/password-change/createPasswordChangeError";
import { DEFAULT_PASSWORD_CHANGE_INPUT as INPUT } from "@/app/utils/password-change/tests/passwordChange.constants";
import { changeOwnPassword } from "../changeOwnPassword";
import { readSignedInWorker } from "../readSignedInWorker";
import { signOutEverywhere } from "../signOutEverywhere";
import { updateOwnPassword } from "../updateOwnPassword";
import { verifyCurrentPassword } from "../verifyCurrentPassword";
import { arrangeSuccessfulOwnPasswordChange } from "./arrangeSuccessfulOwnPasswordChange";
import { RPC_FAILURE } from "./recordSignIn.constants";

describe("changeOwnPassword guards", () => {
  beforeEach(arrangeSuccessfulOwnPasswordChange);

  it("rejects a new password equal to the current one before any network call", async () => {
    const result = await changeOwnPassword({
      confirmPassword: INPUT.currentPassword,
      currentPassword: INPUT.currentPassword,
      newPassword: INPUT.currentPassword,
    });

    expect(result).toMatchObject({
      ok: false,
      error: {
        code: PASSWORD_CHANGE_ERROR_CODE.NEW_PASSWORD_SAME_AS_CURRENT,
      },
    });
    expect(
      createServerSupabaseClient
    ).not.toHaveBeenCalled();
    expect(readSignedInWorker).not.toHaveBeenCalled();
    expect(verifyCurrentPassword).not.toHaveBeenCalled();
  });

  it("propagates a failed session read without verifying, updating or signing out", async () => {
    vi.mocked(readSignedInWorker).mockRejectedValue(
      new Error(RPC_FAILURE.message)
    );

    await expect(changeOwnPassword(INPUT)).rejects.toThrow(
      RPC_FAILURE.message
    );
    expect(verifyCurrentPassword).not.toHaveBeenCalled();
    expect(updateOwnPassword).not.toHaveBeenCalled();
    expect(signOutEverywhere).not.toHaveBeenCalled();
  });

  it.each<PasswordChangeErrorCode>([
    PASSWORD_CHANGE_ERROR_CODE.NEW_PASSWORD_SAME_AS_CURRENT,
    PASSWORD_CHANGE_ERROR_CODE.NEW_PASSWORD_RULES,
    PASSWORD_CHANGE_ERROR_CODE.NETWORK,
    PASSWORD_CHANGE_ERROR_CODE.CURRENT_PASSWORD_INVALID,
    PASSWORD_CHANGE_ERROR_CODE.UNKNOWN,
  ])(
    "returns the %s update error and keeps every session",
    async (code) => {
      vi.mocked(updateOwnPassword).mockResolvedValue(
        createPasswordChangeError(code)
      );

      await expect(
        changeOwnPassword(INPUT)
      ).resolves.toEqual({
        ok: false,
        error: createPasswordChangeError(code),
      });
      expect(signOutEverywhere).not.toHaveBeenCalled();
    }
  );
});

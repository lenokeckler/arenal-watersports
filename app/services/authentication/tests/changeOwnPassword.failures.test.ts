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
import { createPasswordChangeError } from "@/app/utils/password-change/createPasswordChangeError";
import { DEFAULT_PASSWORD_CHANGE_INPUT as INPUT } from "@/app/utils/password-change/tests/passwordChange.constants";
import { changeOwnPassword } from "../changeOwnPassword";
import { signOutEverywhere } from "../signOutEverywhere";
import { updateOwnPassword } from "../updateOwnPassword";
import { verifyCurrentPassword } from "../verifyCurrentPassword";
import { arrangeSuccessfulOwnPasswordChange } from "./arrangeSuccessfulOwnPasswordChange";
import { captureArguments } from "./captureArguments";
import { PASSWORD_UPDATE_REJECTION } from "./changeFirstPassword.constants";
import { RPC_FAILURE } from "./recordSignIn.constants";
import { SUPABASE_CLIENT } from "./supabaseClient.constants";

const errorOf = (code: PasswordChangeErrorCode) =>
  createPasswordChangeError(code);

describe("changeOwnPassword failures", () => {
  beforeEach(arrangeSuccessfulOwnPasswordChange);

  it.each([
    PASSWORD_CHANGE_ERROR_CODE.ACCOUNT_BLOCKED_BY_ATTEMPTS,
    PASSWORD_CHANGE_ERROR_CODE.ACCOUNT_BLOCKED_BY_ADMINISTRATION,
  ])(
    "signs out everywhere and does not update on %s",
    async (code) => {
      const signOutArgumentsOf = captureArguments(
        vi.mocked(signOutEverywhere)
      );
      vi.mocked(verifyCurrentPassword).mockResolvedValue(
        errorOf(code)
      );

      await expect(
        changeOwnPassword(INPUT)
      ).resolves.toEqual({
        ok: false,
        error: errorOf(code),
      });

      expect(signOutArgumentsOf()).toEqual([
        [SUPABASE_CLIENT],
      ]);
      expect(updateOwnPassword).not.toHaveBeenCalled();
    }
  );

  it.each([
    PASSWORD_CHANGE_ERROR_CODE.ACCOUNT_RECOVERY_REQUIRED,
    PASSWORD_CHANGE_ERROR_CODE.CURRENT_PASSWORD_INVALID,
    PASSWORD_CHANGE_ERROR_CODE.NETWORK,
    PASSWORD_CHANGE_ERROR_CODE.TOO_MANY_REQUESTS,
  ])(
    "returns %s without signing out or updating",
    async (code) => {
      vi.mocked(verifyCurrentPassword).mockResolvedValue(
        errorOf(code)
      );

      await expect(
        changeOwnPassword(INPUT)
      ).resolves.toEqual({
        ok: false,
        error: errorOf(code),
      });

      expect(signOutEverywhere).not.toHaveBeenCalled();
      expect(updateOwnPassword).not.toHaveBeenCalled();
    }
  );

  it("returns the update error without signing out", async () => {
    vi.mocked(updateOwnPassword).mockResolvedValue(
      PASSWORD_UPDATE_REJECTION
    );

    await expect(changeOwnPassword(INPUT)).resolves.toEqual(
      {
        ok: false,
        error: PASSWORD_UPDATE_REJECTION,
      }
    );
    expect(signOutEverywhere).not.toHaveBeenCalled();
  });

  it("never reports the block as handled when the global sign-out fails", async () => {
    vi.mocked(verifyCurrentPassword).mockResolvedValue(
      errorOf(
        PASSWORD_CHANGE_ERROR_CODE.ACCOUNT_BLOCKED_BY_ATTEMPTS
      )
    );
    vi.mocked(signOutEverywhere).mockRejectedValue(
      new Error(RPC_FAILURE.message)
    );

    await expect(changeOwnPassword(INPUT)).rejects.toThrow(
      RPC_FAILURE.message
    );
  });

  it("propagates a failed verification and never updates", async () => {
    vi.mocked(verifyCurrentPassword).mockRejectedValue(
      new Error(RPC_FAILURE.message)
    );

    await expect(changeOwnPassword(INPUT)).rejects.toThrow(
      RPC_FAILURE.message
    );
    expect(updateOwnPassword).not.toHaveBeenCalled();
  });
});

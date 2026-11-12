import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import "./reauthenticateSettledWorker.setup";
import { PASSWORD_CHANGE_ERROR_CODE } from "@/app/constants";
import { createPasswordChangeError } from "@/app/utils/password-change/createPasswordChangeError";
import { DEFAULT_PASSWORD_CHANGE_INPUT as INPUT } from "@/app/utils/password-change/tests/passwordChange.constants";
import { readSignedInWorker } from "../readSignedInWorker";
import { reauthenticateSettledWorker } from "../reauthenticateSettledWorker";
import { signOutEverywhere } from "../signOutEverywhere";
import { verifyCurrentPassword } from "../verifyCurrentPassword";
import { captureArguments } from "./captureArguments";
import {
  ALREADY_CHANGED_WORKER,
  FIRST_SIGN_IN_WORKER,
} from "./firstSignIn.constants";
import { RPC_FAILURE } from "./recordSignIn.constants";
import { SUPABASE_CLIENT } from "./supabaseClient.constants";

describe("reauthenticateSettledWorker", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(readSignedInWorker).mockResolvedValue(
      ALREADY_CHANGED_WORKER
    );
    vi.mocked(verifyCurrentPassword).mockResolvedValue(
      null
    );
    vi.mocked(signOutEverywhere).mockResolvedValue(
      undefined
    );
  });

  it("verifies the current password of the signed-in worker and returns the worker", async () => {
    const verifyArgumentsOf = captureArguments(
      vi.mocked(verifyCurrentPassword),
      [null]
    );

    await expect(
      reauthenticateSettledWorker(
        SUPABASE_CLIENT as never,
        INPUT.currentPassword
      )
    ).resolves.toEqual({
      ok: true,
      worker: ALREADY_CHANGED_WORKER,
    });

    expect(verifyArgumentsOf()).toEqual([
      [
        SUPABASE_CLIENT,
        ALREADY_CHANGED_WORKER,
        INPUT.currentPassword,
      ],
    ]);
    expect(signOutEverywhere).not.toHaveBeenCalled();
  });

  it.each([
    ["no worker is signed in", null],
    [
      "the first password change is pending",
      FIRST_SIGN_IN_WORKER,
    ],
  ])(
    "reports an inactive session without counting an attempt when %s",
    async (_name, worker) => {
      vi.mocked(readSignedInWorker).mockResolvedValue(
        worker
      );

      await expect(
        reauthenticateSettledWorker(
          SUPABASE_CLIENT as never,
          INPUT.currentPassword
        )
      ).resolves.toEqual({
        ok: false,
        error: createPasswordChangeError(
          PASSWORD_CHANGE_ERROR_CODE.SESSION_INACTIVE
        ),
      });
      expect(verifyCurrentPassword).not.toHaveBeenCalled();
      expect(signOutEverywhere).not.toHaveBeenCalled();
    }
  );

  it("returns a wrong password without signing out", async () => {
    const error = createPasswordChangeError(
      PASSWORD_CHANGE_ERROR_CODE.CURRENT_PASSWORD_INVALID
    );
    vi.mocked(verifyCurrentPassword).mockResolvedValue(
      error
    );

    await expect(
      reauthenticateSettledWorker(
        SUPABASE_CLIENT as never,
        INPUT.currentPassword
      )
    ).resolves.toEqual({ ok: false, error });
    expect(verifyCurrentPassword).toHaveBeenCalledOnce();
    expect(signOutEverywhere).not.toHaveBeenCalled();
  });

  it("returns a recovery required refusal without signing out", async () => {
    const error = createPasswordChangeError(
      PASSWORD_CHANGE_ERROR_CODE.ACCOUNT_RECOVERY_REQUIRED
    );
    vi.mocked(verifyCurrentPassword).mockResolvedValue(
      error
    );

    await expect(
      reauthenticateSettledWorker(
        SUPABASE_CLIENT as never,
        INPUT.currentPassword
      )
    ).resolves.toEqual({ ok: false, error });
    expect(signOutEverywhere).not.toHaveBeenCalled();
  });

  it.each([
    PASSWORD_CHANGE_ERROR_CODE.ACCOUNT_BLOCKED_BY_ATTEMPTS,
    PASSWORD_CHANGE_ERROR_CODE.ACCOUNT_BLOCKED_BY_ADMINISTRATION,
  ])(
    "signs out everywhere when the result is %s",
    async (code) => {
      const error = createPasswordChangeError(code);
      vi.mocked(verifyCurrentPassword).mockResolvedValue(
        error
      );
      const signOutArgumentsOf = captureArguments(
        vi.mocked(signOutEverywhere)
      );

      await expect(
        reauthenticateSettledWorker(
          SUPABASE_CLIENT as never,
          INPUT.currentPassword
        )
      ).resolves.toEqual({ ok: false, error });
      expect(signOutArgumentsOf()).toEqual([
        [SUPABASE_CLIENT],
      ]);
    }
  );

  it("propagates a failed session read without verifying", async () => {
    vi.mocked(readSignedInWorker).mockRejectedValue(
      new Error(RPC_FAILURE.message)
    );

    await expect(
      reauthenticateSettledWorker(
        SUPABASE_CLIENT as never,
        INPUT.currentPassword
      )
    ).rejects.toThrow(RPC_FAILURE.message);
    expect(verifyCurrentPassword).not.toHaveBeenCalled();
  });
});

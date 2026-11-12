import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import "./changeOwnPassword.setup";
import { PASSWORD_CHANGE_ERROR_CODE } from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { DEFAULT_PASSWORD_CHANGE_INPUT as INPUT } from "@/app/utils/password-change/tests/passwordChange.constants";
import { changeOwnPassword } from "../changeOwnPassword";
import { readSignedInWorker } from "../readSignedInWorker";
import { signOutEverywhere } from "../signOutEverywhere";
import { updateOwnPassword } from "../updateOwnPassword";
import { verifyCurrentPassword } from "../verifyCurrentPassword";
import { SUPABASE_CLIENT } from "./supabaseClient.constants";
import { arrangeSuccessfulOwnPasswordChange } from "./arrangeSuccessfulOwnPasswordChange";
import { captureArguments } from "./captureArguments";
import {
  ALREADY_CHANGED_WORKER,
  FIRST_SIGN_IN_WORKER,
} from "./firstSignIn.constants";

describe("changeOwnPassword", () => {
  beforeEach(arrangeSuccessfulOwnPasswordChange);

  it("verifies the current password and then updates with it", async () => {
    const verifyArgumentsOf = captureArguments(
      vi.mocked(verifyCurrentPassword),
      [null]
    );
    const updateArgumentsOf = captureArguments(
      vi.mocked(updateOwnPassword),
      [null]
    );

    await expect(changeOwnPassword(INPUT)).resolves.toEqual(
      { ok: true }
    );

    expect(verifyArgumentsOf()).toEqual([
      [
        SUPABASE_CLIENT,
        ALREADY_CHANGED_WORKER,
        INPUT.currentPassword,
      ],
    ]);
    expect(updateArgumentsOf()).toEqual([
      [SUPABASE_CLIENT, INPUT],
    ]);
    expect(
      Math.max(
        ...vi.mocked(verifyCurrentPassword).mock
          .invocationCallOrder
      )
    ).toBeLessThan(
      Math.min(
        ...vi.mocked(updateOwnPassword).mock
          .invocationCallOrder
      )
    );
    expect(signOutEverywhere).not.toHaveBeenCalled();
  });

  it("rejects invalid input before touching anything", async () => {
    const result = await changeOwnPassword({
      ...INPUT,
      confirmPassword: INPUT.currentPassword,
    });

    expect(result).toMatchObject({
      ok: false,
      error: {
        code: PASSWORD_CHANGE_ERROR_CODE.CONFIRMATION_MISMATCH,
      },
    });
    expect(
      createServerSupabaseClient
    ).not.toHaveBeenCalled();
    expect(verifyCurrentPassword).not.toHaveBeenCalled();
  });

  it.each([
    ["no worker is signed in", null],
    [
      "the first password change is pending",
      FIRST_SIGN_IN_WORKER,
    ],
  ])(
    "reports an inactive session when %s",
    async (_name, worker) => {
      vi.mocked(readSignedInWorker).mockResolvedValue(
        worker
      );

      const result = await changeOwnPassword(INPUT);

      expect(result).toMatchObject({
        ok: false,
        error: {
          code: PASSWORD_CHANGE_ERROR_CODE.SESSION_INACTIVE,
        },
      });
      expect(verifyCurrentPassword).not.toHaveBeenCalled();
      expect(updateOwnPassword).not.toHaveBeenCalled();
      expect(signOutEverywhere).not.toHaveBeenCalled();
    }
  );
});

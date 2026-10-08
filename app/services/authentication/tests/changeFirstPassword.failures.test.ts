import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import "./changeFirstPassword.setup";
import { FIRST_SIGN_IN_ERROR_CODE } from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { DEFAULT_FIRST_PASSWORD_CHANGE_INPUT as INPUT } from "@/app/utils/first-sign-in/tests/firstSignIn.constants";
import { changeFirstPassword } from "../changeFirstPassword";
import { checkWorkerPassword } from "../checkWorkerPassword";
import { completeFirstPasswordChange } from "../completeFirstPasswordChange";
import { readFirstSignInWorker } from "../readFirstSignInWorker";
import { recordSuccessfulSignIn } from "../recordSuccessfulSignIn";
import { refreshFirstSignInSession } from "../refreshFirstSignInSession";
import { updateSignedInPassword } from "../updateSignedInPassword";
import { arrangeSuccessfulPasswordChange } from "./arrangeSuccessfulPasswordChange";
import {
  PASSWORD_UPDATE_REJECTION,
  TEMPORARY_PASSWORD_REJECTION,
} from "./changeFirstPassword.constants";
import { BLOCKED_BY_ATTEMPTS_ERROR } from "./hookRejectionErrors.constants";
import { RPC_FAILURE } from "./recordSignIn.constants";

describe("changeFirstPassword failures", () => {
  beforeEach(arrangeSuccessfulPasswordChange);

  it("rejects invalid input before touching anything", async () => {
    const result = await changeFirstPassword({
      ...INPUT,
      confirmPassword: INPUT.currentPassword,
    });

    expect(result).toMatchObject({
      ok: false,
      error: {
        code: FIRST_SIGN_IN_ERROR_CODE.CONFIRMATION_MISMATCH,
      },
    });
    expect(
      createServerSupabaseClient
    ).not.toHaveBeenCalled();
  });

  it("reports an inactive session when no worker is signed in", async () => {
    vi.mocked(readFirstSignInWorker).mockResolvedValue(
      null
    );

    const result = await changeFirstPassword(INPUT);

    expect(result).toMatchObject({
      ok: false,
      error: {
        code: FIRST_SIGN_IN_ERROR_CODE.SESSION_INACTIVE,
      },
    });
    expect(checkWorkerPassword).not.toHaveBeenCalled();
  });

  it("does not update when the temporary password is rejected", async () => {
    vi.mocked(checkWorkerPassword).mockResolvedValue(
      BLOCKED_BY_ATTEMPTS_ERROR
    );

    await expect(
      changeFirstPassword(INPUT)
    ).resolves.toEqual({
      ok: false,
      error: TEMPORARY_PASSWORD_REJECTION,
    });
    expect(recordSuccessfulSignIn).not.toHaveBeenCalled();
    expect(updateSignedInPassword).not.toHaveBeenCalled();
    expect(
      completeFirstPasswordChange
    ).not.toHaveBeenCalled();
  });

  it("stops before the update when the verification throws", async () => {
    vi.mocked(checkWorkerPassword).mockRejectedValue(
      new Error(RPC_FAILURE.message)
    );

    await expect(
      changeFirstPassword(INPUT)
    ).rejects.toThrow(RPC_FAILURE.message);
    expect(updateSignedInPassword).not.toHaveBeenCalled();
    expect(
      completeFirstPasswordChange
    ).not.toHaveBeenCalled();
  });

  it("does not complete when the update is rejected", async () => {
    vi.mocked(updateSignedInPassword).mockResolvedValue(
      PASSWORD_UPDATE_REJECTION
    );

    await expect(
      changeFirstPassword(INPUT)
    ).resolves.toEqual({
      ok: false,
      error: PASSWORD_UPDATE_REJECTION,
    });
    expect(
      completeFirstPasswordChange
    ).not.toHaveBeenCalled();
    expect(
      refreshFirstSignInSession
    ).not.toHaveBeenCalled();
  });

  it.each([
    ["completion", completeFirstPasswordChange],
    ["refresh", refreshFirstSignInSession],
  ])(
    "propagates a failed %s and never succeeds",
    async (_name, step) => {
      vi.mocked(step).mockRejectedValue(
        new Error(RPC_FAILURE.message)
      );

      await expect(
        changeFirstPassword(INPUT)
      ).rejects.toThrow(RPC_FAILURE.message);
    }
  );
});

import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
  type Mock,
} from "vitest";
import "./changeFirstPassword.setup";
import { PASSWORD_CHANGE_ERROR_CODE } from "@/app/constants";
import { DEFAULT_PASSWORD_CHANGE_INPUT as INPUT } from "@/app/utils/password-change/tests/passwordChange.constants";
import { changeFirstPassword } from "../changeFirstPassword";
import { checkWorkerPassword } from "../checkWorkerPassword";
import { completeFirstPasswordChange } from "../completeFirstPasswordChange";
import { readSignedInWorker } from "../readSignedInWorker";
import { recordFailedSignIn } from "../recordFailedSignIn";
import { recordSuccessfulSignIn } from "../recordSuccessfulSignIn";
import { refreshFirstSignInSession } from "../refreshFirstSignInSession";
import { updateSignedInPassword } from "../updateSignedInPassword";
import { arrangeSuccessfulPasswordChange } from "./arrangeSuccessfulPasswordChange";
import { ALREADY_CHANGED_WORKER } from "./firstSignIn.constants";
import { INVALID_CREDENTIALS_ERROR } from "./mapSignInAuthError.constants";
import { RPC_FAILURE } from "./recordSignIn.constants";

const interruptedAttemptAt = async (
  step: Mock
): Promise<void> => {
  step.mockRejectedValueOnce(
    new Error(RPC_FAILURE.message)
  );

  await expect(changeFirstPassword(INPUT)).rejects.toThrow(
    RPC_FAILURE.message
  );
};

describe("changeFirstPassword retried with the same inputs", () => {
  beforeEach(arrangeSuccessfulPasswordChange);

  it("finishes without a failed attempt when the update already happened", async () => {
    await interruptedAttemptAt(
      vi.mocked(completeFirstPasswordChange)
    );
    vi.mocked(checkWorkerPassword)
      .mockResolvedValueOnce(INVALID_CREDENTIALS_ERROR)
      .mockResolvedValueOnce(null);

    await expect(
      changeFirstPassword(INPUT)
    ).resolves.toEqual({ ok: true });

    expect(updateSignedInPassword).toHaveBeenCalledOnce();
    expect(
      completeFirstPasswordChange
    ).toHaveBeenCalledTimes(2);
    expect(
      refreshFirstSignInSession
    ).toHaveBeenCalledOnce();
    expect(recordFailedSignIn).not.toHaveBeenCalled();
  });

  it("only refreshes when the change completed but the refresh failed", async () => {
    await interruptedAttemptAt(
      vi.mocked(refreshFirstSignInSession)
    );
    vi.mocked(readSignedInWorker).mockResolvedValue(
      ALREADY_CHANGED_WORKER
    );

    await expect(
      changeFirstPassword(INPUT)
    ).resolves.toEqual({ ok: true });

    expect(checkWorkerPassword).toHaveBeenCalledOnce();
    expect(updateSignedInPassword).toHaveBeenCalledOnce();
    expect(
      completeFirstPasswordChange
    ).toHaveBeenCalledOnce();
    expect(recordSuccessfulSignIn).toHaveBeenCalledOnce();
    expect(refreshFirstSignInSession).toHaveBeenCalledTimes(
      2
    );
  });

  it("counts one failed attempt when neither password works", async () => {
    vi.mocked(checkWorkerPassword).mockResolvedValue(
      INVALID_CREDENTIALS_ERROR
    );

    await expect(
      changeFirstPassword(INPUT)
    ).resolves.toMatchObject({
      ok: false,
      error: {
        code: PASSWORD_CHANGE_ERROR_CODE.CURRENT_PASSWORD_INVALID,
      },
    });

    expect(recordFailedSignIn).toHaveBeenCalledOnce();
    expect(recordSuccessfulSignIn).not.toHaveBeenCalled();
    expect(updateSignedInPassword).not.toHaveBeenCalled();
  });
});

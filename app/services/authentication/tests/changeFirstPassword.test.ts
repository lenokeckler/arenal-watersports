import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import "./changeFirstPassword.setup";
import { DEFAULT_PASSWORD_CHANGE_INPUT as INPUT } from "@/app/utils/password-change/tests/passwordChange.constants";
import { changeFirstPassword } from "../changeFirstPassword";
import { checkWorkerPassword } from "../checkWorkerPassword";
import { completeFirstPasswordChange } from "../completeFirstPasswordChange";
import { readSignedInWorker } from "../readSignedInWorker";
import { recordSuccessfulSignIn } from "../recordSuccessfulSignIn";
import { refreshFirstSignInSession } from "../refreshFirstSignInSession";
import { updateSignedInPassword } from "../updateSignedInPassword";
import {
  SUPABASE_CLIENT,
  arrangeSuccessfulPasswordChange,
} from "./arrangeSuccessfulPasswordChange";
import { captureArguments } from "./captureArguments";
import {
  ALREADY_CHANGED_WORKER,
  FIRST_SIGN_IN_WORKER,
} from "./firstSignIn.constants";

describe("changeFirstPassword", () => {
  beforeEach(arrangeSuccessfulPasswordChange);

  it("changes the password and refreshes the session in order", async () => {
    const readArgumentsOf = captureArguments(
      vi.mocked(readSignedInWorker),
      [FIRST_SIGN_IN_WORKER]
    );
    const updateArgumentsOf = captureArguments(
      vi.mocked(updateSignedInPassword),
      [null]
    );
    const streakArgumentsOf = captureArguments(
      vi.mocked(recordSuccessfulSignIn)
    );
    const completeArgumentsOf = captureArguments(
      vi.mocked(completeFirstPasswordChange)
    );
    const refreshArgumentsOf = captureArguments(
      vi.mocked(refreshFirstSignInSession)
    );

    await expect(
      changeFirstPassword(INPUT)
    ).resolves.toEqual({ ok: true });

    expect(readArgumentsOf()).toHaveLength(1);
    expect(readArgumentsOf()[0][0]).toBe(SUPABASE_CLIENT);
    expect(updateArgumentsOf()).toEqual([
      [SUPABASE_CLIENT, INPUT.newPassword],
    ]);
    expect(streakArgumentsOf()).toEqual([
      [FIRST_SIGN_IN_WORKER.id],
    ]);
    expect(completeArgumentsOf()).toEqual([
      [FIRST_SIGN_IN_WORKER.id],
    ]);
    expect(refreshArgumentsOf()).toEqual([
      [SUPABASE_CLIENT],
    ]);
    expect(
      vi.mocked(updateSignedInPassword).mock
        .invocationCallOrder[0]
    ).toBeLessThan(
      vi.mocked(completeFirstPasswordChange).mock
        .invocationCallOrder[0]
    );
  });

  it("only refreshes the session when the change was already completed", async () => {
    vi.mocked(readSignedInWorker).mockResolvedValue(
      ALREADY_CHANGED_WORKER
    );

    await expect(
      changeFirstPassword(INPUT)
    ).resolves.toEqual({ ok: true });

    expect(
      refreshFirstSignInSession
    ).toHaveBeenCalledOnce();
    expect(checkWorkerPassword).not.toHaveBeenCalled();
    expect(updateSignedInPassword).not.toHaveBeenCalled();
    expect(
      completeFirstPasswordChange
    ).not.toHaveBeenCalled();
    expect(recordSuccessfulSignIn).not.toHaveBeenCalled();
  });
});

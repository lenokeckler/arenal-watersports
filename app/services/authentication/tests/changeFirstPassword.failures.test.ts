import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { FIRST_SIGN_IN_ERROR_CODE } from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { DEFAULT_FIRST_PASSWORD_CHANGE_INPUT } from "@/app/utils/first-sign-in/tests/firstSignIn.constants";
import { changeFirstPassword } from "../changeFirstPassword";
import { completeFirstPasswordChange } from "../completeFirstPasswordChange";
import { readFirstSignInWorker } from "../readFirstSignInWorker";
import { refreshFirstSignInSession } from "../refreshFirstSignInSession";
import { updateSignedInPassword } from "../updateSignedInPassword";
import { verifyTemporaryPassword } from "../verifyTemporaryPassword";
import { arrangeSuccessfulPasswordChange } from "./arrangeSuccessfulPasswordChange";
import {
  PASSWORD_UPDATE_REJECTION,
  TEMPORARY_PASSWORD_REJECTION,
} from "./changeFirstPassword.constants";
import { RPC_FAILURE } from "./recordSignIn.constants";

vi.mock(
  "@/app/services/supabase",
  () => import("./mocks/supabaseServices.mock")
);
vi.mock(
  "../readFirstSignInWorker",
  () => import("./mocks/readFirstSignInWorker.mock")
);
vi.mock(
  "../verifyTemporaryPassword",
  () => import("./mocks/verifyTemporaryPassword.mock")
);
vi.mock(
  "../updateSignedInPassword",
  () => import("./mocks/updateSignedInPassword.mock")
);
vi.mock(
  "../completeFirstPasswordChange",
  () => import("./mocks/completeFirstPasswordChange.mock")
);
vi.mock(
  "../refreshFirstSignInSession",
  () => import("./mocks/refreshFirstSignInSession.mock")
);

const INPUT = DEFAULT_FIRST_PASSWORD_CHANGE_INPUT;

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

  it("reports an inactive session when no worker is pending", async () => {
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
    expect(verifyTemporaryPassword).not.toHaveBeenCalled();
  });

  it("does not update when the temporary password is rejected", async () => {
    vi.mocked(verifyTemporaryPassword).mockResolvedValue(
      TEMPORARY_PASSWORD_REJECTION
    );

    await expect(
      changeFirstPassword(INPUT)
    ).resolves.toEqual({
      ok: false,
      error: TEMPORARY_PASSWORD_REJECTION,
    });
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

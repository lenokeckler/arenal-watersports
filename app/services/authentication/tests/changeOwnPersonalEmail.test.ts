import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import "./changeOwnPersonalEmail.setup";
import {
  PERSONAL_EMAIL_ERROR_CODE,
  PERSONAL_EMAIL_INTENT,
} from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import {
  DEFAULT_PERSONAL_EMAIL_CHANGE_INPUT as INPUT,
  INVALID_ADDRESS,
  UNKNOWN_INTENT,
} from "@/app/utils/personal-email/tests/personalEmail.constants";
import { changeOwnPersonalEmail } from "../changeOwnPersonalEmail";
import { readOwnPersonalEmail } from "../readOwnPersonalEmail";
import { reauthenticateSettledWorker } from "../reauthenticateSettledWorker";
import { updateOwnPersonalEmail } from "../updateOwnPersonalEmail";
import { arrangeSuccessfulOwnPersonalEmailChange } from "./arrangeSuccessfulOwnPersonalEmailChange";
import { captureArguments } from "./captureArguments";
import { ALREADY_CHANGED_WORKER } from "./firstSignIn.constants";
import { PADDED_MIXED_CASE_ADDRESS } from "./changeOwnPersonalEmail.constants";
import { SUPABASE_CLIENT } from "./supabaseClient.constants";

describe("changeOwnPersonalEmail", () => {
  beforeEach(arrangeSuccessfulOwnPersonalEmailChange);

  it("re-authenticates with the current password and then saves the address", async () => {
    const reauthenticationArgumentsOf = captureArguments(
      vi.mocked(reauthenticateSettledWorker),
      [{ ok: true, worker: ALREADY_CHANGED_WORKER }]
    );
    const updateArgumentsOf = captureArguments(
      vi.mocked(updateOwnPersonalEmail)
    );

    await expect(
      changeOwnPersonalEmail(INPUT)
    ).resolves.toEqual({
      ok: true,
      intent: PERSONAL_EMAIL_INTENT.SAVE,
    });

    expect(reauthenticationArgumentsOf()).toEqual([
      [SUPABASE_CLIENT, INPUT.currentPassword],
    ]);
    expect(updateArgumentsOf()).toEqual([
      [SUPABASE_CLIENT, INPUT.email],
    ]);
    expect(
      Math.max(
        ...vi.mocked(reauthenticateSettledWorker).mock
          .invocationCallOrder
      )
    ).toBeLessThan(
      Math.min(
        ...vi.mocked(updateOwnPersonalEmail).mock
          .invocationCallOrder
      )
    );
    expect(readOwnPersonalEmail).not.toHaveBeenCalled();
  });

  it("writes the normalised address", async () => {
    const updateArgumentsOf = captureArguments(
      vi.mocked(updateOwnPersonalEmail)
    );

    await changeOwnPersonalEmail({
      ...INPUT,
      email: PADDED_MIXED_CASE_ADDRESS,
    });

    expect(updateArgumentsOf()).toEqual([
      [SUPABASE_CLIENT, INPUT.email],
    ]);
  });

  it("removes the address by writing null when the account does not require one", async () => {
    const updateArgumentsOf = captureArguments(
      vi.mocked(updateOwnPersonalEmail)
    );

    await expect(
      changeOwnPersonalEmail({
        ...INPUT,
        intent: PERSONAL_EMAIL_INTENT.REMOVE,
      })
    ).resolves.toEqual({
      ok: true,
      intent: PERSONAL_EMAIL_INTENT.REMOVE,
    });

    expect(updateArgumentsOf()).toEqual([
      [SUPABASE_CLIENT, null],
    ]);
    expect(readOwnPersonalEmail).toHaveBeenCalledOnce();
  });

  it.each([
    [
      "an unknown intent",
      { ...INPUT, intent: UNKNOWN_INTENT },
      PERSONAL_EMAIL_ERROR_CODE.INTENT_INVALID,
    ],
    [
      "an invalid address",
      { ...INPUT, email: INVALID_ADDRESS },
      PERSONAL_EMAIL_ERROR_CODE.EMAIL_INVALID,
    ],
    [
      "no password",
      { ...INPUT, currentPassword: "" },
      PERSONAL_EMAIL_ERROR_CODE.CURRENT_PASSWORD_REQUIRED,
    ],
  ])(
    "rejects %s before touching anything",
    async (_name, input, code) => {
      await expect(
        changeOwnPersonalEmail(input)
      ).resolves.toMatchObject({
        ok: false,
        error: { code },
      });

      expect(
        createServerSupabaseClient
      ).not.toHaveBeenCalled();
      expect(
        reauthenticateSettledWorker
      ).not.toHaveBeenCalled();
      expect(updateOwnPersonalEmail).not.toHaveBeenCalled();
    }
  );
});

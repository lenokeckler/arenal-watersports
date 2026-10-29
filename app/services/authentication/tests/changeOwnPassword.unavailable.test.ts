import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import "./changeOwnPassword.setup";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { DEFAULT_PASSWORD_CHANGE_INPUT as INPUT } from "@/app/utils/password-change/tests/passwordChange.constants";
import { changeOwnPassword } from "../changeOwnPassword";
import { readSignedInWorker } from "../readSignedInWorker";
import { signOutEverywhere } from "../signOutEverywhere";
import { updateOwnPassword } from "../updateOwnPassword";
import { arrangeSuccessfulOwnPasswordChange } from "./arrangeSuccessfulOwnPasswordChange";
import { RPC_FAILURE } from "./recordSignIn.constants";

describe("changeOwnPassword unavailable dependencies", () => {
  beforeEach(arrangeSuccessfulOwnPasswordChange);

  it.each([
    [
      "the Supabase client",
      () =>
        vi
          .mocked(createServerSupabaseClient)
          .mockRejectedValue(
            new Error(RPC_FAILURE.message)
          ),
      readSignedInWorker,
    ],
    [
      "the password update",
      () =>
        vi
          .mocked(updateOwnPassword)
          .mockRejectedValue(
            new Error(RPC_FAILURE.message)
          ),
      signOutEverywhere,
    ],
  ])(
    "fails closed when %s throws",
    async (_name, breakDependency, untouched) => {
      breakDependency();

      await expect(
        changeOwnPassword(INPUT)
      ).rejects.toThrow(RPC_FAILURE.message);
      expect(untouched).not.toHaveBeenCalled();
      expect(signOutEverywhere).not.toHaveBeenCalled();
    }
  );
});

import { describe, expect, it } from "vitest";
import {
  PASSWORD_CHANGE_ERROR_CODE,
  PASSWORD_CHANGE_TO_RECOVERY_ERROR_CODE,
  PASSWORD_RECOVERY_ERROR_CODE,
  type PasswordChangeErrorCode,
  type PasswordRecoveryErrorCode,
} from "@/app/constants";
import { createPasswordChangeError } from "@/app/utils/password-change/createPasswordChangeError";
import { createPasswordRecoveryError } from "../createPasswordRecoveryError";
import { mapPasswordChangeErrorToRecovery } from "../mapPasswordChangeErrorToRecovery";

const mappedCodes = Object.entries(
  PASSWORD_CHANGE_TO_RECOVERY_ERROR_CODE
) as [PasswordChangeErrorCode, PasswordRecoveryErrorCode][];

describe("mapPasswordChangeErrorToRecovery", () => {
  it.each(mappedCodes)(
    "maps %s to the recovery code %s",
    (code, expected) => {
      expect(
        mapPasswordChangeErrorToRecovery(
          createPasswordChangeError(code)
        )
      ).toEqual(createPasswordRecoveryError(expected));
    }
  );

  it("falls back to unknown for a code recovery never produces", () => {
    expect(
      mapPasswordChangeErrorToRecovery(
        createPasswordChangeError(
          PASSWORD_CHANGE_ERROR_CODE.CURRENT_PASSWORD_INVALID
        )
      )
    ).toEqual(
      createPasswordRecoveryError(
        PASSWORD_RECOVERY_ERROR_CODE.UNKNOWN
      )
    );
  });
});

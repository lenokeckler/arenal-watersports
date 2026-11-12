import { describe, expect, it } from "vitest";
import {
  PASSWORD_CHANGE_ERROR_CODE,
  PASSWORD_RECOVERY_ERROR_CODE,
} from "@/app/constants";
import { createPasswordChangeError } from "@/app/utils/password-change/createPasswordChangeError";
import { createPasswordRecoveryError } from "../createPasswordRecoveryError";
import { mapPasswordChangeErrorToRecovery } from "../mapPasswordChangeErrorToRecovery";
import { SHARED_CODES } from "./passwordRecovery.constants";

describe("mapPasswordChangeErrorToRecovery", () => {
  it.each(SHARED_CODES)(
    "keeps the shared code %s",
    (code) => {
      expect(
        mapPasswordChangeErrorToRecovery(
          createPasswordChangeError(code)
        )
      ).toEqual(createPasswordRecoveryError(code));
    }
  );

  it.each([
    PASSWORD_CHANGE_ERROR_CODE.CURRENT_PASSWORD_INVALID,
    PASSWORD_CHANGE_ERROR_CODE.CURRENT_PASSWORD_REQUIRED,
    PASSWORD_CHANGE_ERROR_CODE.NEW_PASSWORD_SAME_AS_CURRENT,
  ])("falls back to unknown for %s", (code) => {
    expect(
      mapPasswordChangeErrorToRecovery(
        createPasswordChangeError(code)
      )
    ).toEqual(
      createPasswordRecoveryError(
        PASSWORD_RECOVERY_ERROR_CODE.UNKNOWN
      )
    );
  });
});

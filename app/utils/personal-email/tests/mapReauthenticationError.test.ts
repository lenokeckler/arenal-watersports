import { describe, expect, it } from "vitest";
import {
  PASSWORD_CHANGE_ERROR_CODE,
  PERSONAL_EMAIL_ERROR_CODE,
} from "@/app/constants";
import { createPasswordChangeError } from "@/app/utils/password-change/createPasswordChangeError";
import { createPersonalEmailError } from "../createPersonalEmailError";
import { mapReauthenticationError } from "../mapReauthenticationError";

describe("mapReauthenticationError", () => {
  it("keeps a code the personal email form knows", () => {
    expect(
      mapReauthenticationError(
        createPasswordChangeError(
          PERSONAL_EMAIL_ERROR_CODE.CURRENT_PASSWORD_INVALID
        )
      )
    ).toEqual(
      createPersonalEmailError(
        PERSONAL_EMAIL_ERROR_CODE.CURRENT_PASSWORD_INVALID
      )
    );
  });

  it("keeps the recovery required refusal on the form", () => {
    expect(
      mapReauthenticationError(
        createPasswordChangeError(
          PASSWORD_CHANGE_ERROR_CODE.ACCOUNT_RECOVERY_REQUIRED
        )
      )
    ).toEqual(
      createPersonalEmailError(
        PERSONAL_EMAIL_ERROR_CODE.ACCOUNT_RECOVERY_REQUIRED
      )
    );
  });

  it("turns a code it does not know into unknown", () => {
    expect(
      mapReauthenticationError(
        createPasswordChangeError(
          PASSWORD_CHANGE_ERROR_CODE.CONFIRMATION_MISMATCH
        )
      )
    ).toEqual(
      createPersonalEmailError(
        PERSONAL_EMAIL_ERROR_CODE.UNKNOWN
      )
    );
  });
});

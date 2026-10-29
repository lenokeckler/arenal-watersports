import { describe, expect, it } from "vitest";
import { PASSWORD_CHANGE_FIELD } from "@/app/constants/access/PasswordChangeError.constants";
import { DEFAULT_PASSWORD_CHANGE_INPUT } from "@/app/utils/password-change/tests/passwordChange.constants";
import { NO_PASSWORD_CHANGE_FORM_ERRORS } from "../constants/PasswordChangeDefaults.constants";
import { FIRST_SIGN_IN_ERROR_COPY } from "../constants/FirstSignInErrorCopy.constants";
import { resolvePasswordChangeFormErrors } from "../utils/resolvePasswordChangeFormErrors";
import {
  CURRENT_PASSWORD_INVALID_ERROR,
  NETWORK_ERROR,
  NEW_PASSWORD_RULES_ERROR,
} from "./passwordChangeErrors.constants";
import { WEAK_NEW_PASSWORD_INPUT } from "./resolvePasswordChangeFormErrors.constants";

describe("resolvePasswordChangeFormErrors", () => {
  it("shows no error before the first submit", () => {
    expect(
      resolvePasswordChangeFormErrors({
        errorCopy: FIRST_SIGN_IN_ERROR_COPY,
        hasSubmitted: false,
        serverError: null,
        values: WEAK_NEW_PASSWORD_INPUT,
      })
    ).toEqual(NO_PASSWORD_CHANGE_FORM_ERRORS);
  });

  it("shows the validation error under its field after a submit", () => {
    expect(
      resolvePasswordChangeFormErrors({
        errorCopy: FIRST_SIGN_IN_ERROR_COPY,
        hasSubmitted: true,
        serverError: null,
        values: WEAK_NEW_PASSWORD_INPUT,
      })
    ).toEqual({
      ...NO_PASSWORD_CHANGE_FORM_ERRORS,
      [PASSWORD_CHANGE_FIELD.NEW_PASSWORD]:
        FIRST_SIGN_IN_ERROR_COPY[
          NEW_PASSWORD_RULES_ERROR.code
        ],
    });
  });

  it("shows no error for valid values after a submit", () => {
    expect(
      resolvePasswordChangeFormErrors({
        errorCopy: FIRST_SIGN_IN_ERROR_COPY,
        hasSubmitted: true,
        serverError: null,
        values: DEFAULT_PASSWORD_CHANGE_INPUT,
      })
    ).toEqual(NO_PASSWORD_CHANGE_FORM_ERRORS);
  });

  it("shows the server error under its field before any client submit", () => {
    expect(
      resolvePasswordChangeFormErrors({
        errorCopy: FIRST_SIGN_IN_ERROR_COPY,
        hasSubmitted: false,
        serverError: CURRENT_PASSWORD_INVALID_ERROR,
        values: DEFAULT_PASSWORD_CHANGE_INPUT,
      })
    ).toEqual({
      ...NO_PASSWORD_CHANGE_FORM_ERRORS,
      [PASSWORD_CHANGE_FIELD.CURRENT_PASSWORD]:
        FIRST_SIGN_IN_ERROR_COPY[
          CURRENT_PASSWORD_INVALID_ERROR.code
        ],
    });
  });

  it("keeps the validation error of another field next to the server error", () => {
    const errors = resolvePasswordChangeFormErrors({
      errorCopy: FIRST_SIGN_IN_ERROR_COPY,
      hasSubmitted: true,
      serverError: NETWORK_ERROR,
      values: WEAK_NEW_PASSWORD_INPUT,
    });

    expect(errors[PASSWORD_CHANGE_FIELD.FORM]).toBe(
      FIRST_SIGN_IN_ERROR_COPY[NETWORK_ERROR.code]
    );
    expect(errors[PASSWORD_CHANGE_FIELD.NEW_PASSWORD]).toBe(
      FIRST_SIGN_IN_ERROR_COPY[
        NEW_PASSWORD_RULES_ERROR.code
      ]
    );
  });
});

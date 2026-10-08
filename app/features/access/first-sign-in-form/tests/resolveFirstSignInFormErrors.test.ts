import { describe, expect, it } from "vitest";
import { FIRST_SIGN_IN_FIELD } from "@/app/constants/access/FirstSignInError.constants";
import { DEFAULT_FIRST_PASSWORD_CHANGE_INPUT } from "@/app/utils/first-sign-in/tests/firstSignIn.constants";
import { NO_FIRST_SIGN_IN_FORM_ERRORS } from "../constants/FirstSignInDefaults.constants";
import { FIRST_SIGN_IN_ERROR_COPY } from "../constants/FirstSignInErrorCopy.constants";
import { resolveFirstSignInFormErrors } from "../utils/resolveFirstSignInFormErrors";
import {
  CURRENT_PASSWORD_INVALID_ERROR,
  NETWORK_ERROR,
  NEW_PASSWORD_RULES_ERROR,
  WEAK_NEW_PASSWORD_INPUT,
} from "./resolveFirstSignInFormErrors.constants";

describe("resolveFirstSignInFormErrors", () => {
  it("shows no error before the first submit", () => {
    expect(
      resolveFirstSignInFormErrors({
        hasSubmitted: false,
        serverError: null,
        values: WEAK_NEW_PASSWORD_INPUT,
      })
    ).toEqual(NO_FIRST_SIGN_IN_FORM_ERRORS);
  });

  it("shows the validation error under its field after a submit", () => {
    expect(
      resolveFirstSignInFormErrors({
        hasSubmitted: true,
        serverError: null,
        values: WEAK_NEW_PASSWORD_INPUT,
      })
    ).toEqual({
      ...NO_FIRST_SIGN_IN_FORM_ERRORS,
      [FIRST_SIGN_IN_FIELD.NEW_PASSWORD]:
        FIRST_SIGN_IN_ERROR_COPY[
          NEW_PASSWORD_RULES_ERROR.code
        ],
    });
  });

  it("shows no error for valid values after a submit", () => {
    expect(
      resolveFirstSignInFormErrors({
        hasSubmitted: true,
        serverError: null,
        values: DEFAULT_FIRST_PASSWORD_CHANGE_INPUT,
      })
    ).toEqual(NO_FIRST_SIGN_IN_FORM_ERRORS);
  });

  it("shows the server error under its field before any client submit", () => {
    expect(
      resolveFirstSignInFormErrors({
        hasSubmitted: false,
        serverError: CURRENT_PASSWORD_INVALID_ERROR,
        values: DEFAULT_FIRST_PASSWORD_CHANGE_INPUT,
      })
    ).toEqual({
      ...NO_FIRST_SIGN_IN_FORM_ERRORS,
      [FIRST_SIGN_IN_FIELD.CURRENT_PASSWORD]:
        FIRST_SIGN_IN_ERROR_COPY[
          CURRENT_PASSWORD_INVALID_ERROR.code
        ],
    });
  });

  it("keeps the validation error of another field next to the server error", () => {
    const errors = resolveFirstSignInFormErrors({
      hasSubmitted: true,
      serverError: NETWORK_ERROR,
      values: WEAK_NEW_PASSWORD_INPUT,
    });

    expect(errors[FIRST_SIGN_IN_FIELD.FORM]).toBe(
      FIRST_SIGN_IN_ERROR_COPY[NETWORK_ERROR.code]
    );
    expect(errors[FIRST_SIGN_IN_FIELD.NEW_PASSWORD]).toBe(
      FIRST_SIGN_IN_ERROR_COPY[
        NEW_PASSWORD_RULES_ERROR.code
      ]
    );
  });
});

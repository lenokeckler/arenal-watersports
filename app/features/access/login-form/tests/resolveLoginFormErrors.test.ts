import { describe, expect, it } from "vitest";
import { SIGN_IN_ERROR_CODE } from "@/app/constants";
import { DEFAULT_SIGN_IN_CREDENTIALS } from "@/app/utils/sign-in/tests/signIn.constants";
import { EMPTY_SIGN_IN_CREDENTIALS } from "../constants/LoginFormDefaults.constants";
import { SIGN_IN_ERROR_COPY } from "../constants/SignInErrorCopy.constants";
import { resolveLoginFormErrors } from "../utils/resolveLoginFormErrors";
import { createSignInError } from "@/app/utils/sign-in/createSignInError";
import { RECOVERY_REQUIRED_ERROR } from "./LoginFormView.constants";
import { INVALID_CREDENTIALS_ERROR } from "./submitSignIn.constants";

describe("resolveLoginFormErrors", () => {
  it("shows no error before the first submit", () => {
    expect(
      resolveLoginFormErrors({
        fallbackError: null,
        hasSubmitted: false,
        serverError: null,
        values: EMPTY_SIGN_IN_CREDENTIALS,
      }).usernameError
    ).toBeUndefined();
  });

  it("shows the validation error after a submit", () => {
    expect(
      resolveLoginFormErrors({
        fallbackError: null,
        hasSubmitted: true,
        serverError: null,
        values: EMPTY_SIGN_IN_CREDENTIALS,
      }).usernameError
    ).toBe(
      SIGN_IN_ERROR_COPY[
        SIGN_IN_ERROR_CODE.USERNAME_REQUIRED
      ]
    );
  });

  it("shows the error of a posted form under its field", () => {
    expect(
      resolveLoginFormErrors({
        fallbackError: INVALID_CREDENTIALS_ERROR,
        hasSubmitted: false,
        serverError: null,
        values: EMPTY_SIGN_IN_CREDENTIALS,
      }).passwordError
    ).toBe(
      SIGN_IN_ERROR_COPY[
        SIGN_IN_ERROR_CODE.INVALID_CREDENTIALS
      ]
    );
  });

  it("puts the server error before any other", () => {
    expect(
      resolveLoginFormErrors({
        fallbackError: null,
        hasSubmitted: true,
        serverError: INVALID_CREDENTIALS_ERROR,
        values: DEFAULT_SIGN_IN_CREDENTIALS,
      }).passwordError
    ).toBe(
      SIGN_IN_ERROR_COPY[
        SIGN_IN_ERROR_CODE.INVALID_CREDENTIALS
      ]
    );
  });

  it("offers the recovery for a recovery required server error", () => {
    expect(
      resolveLoginFormErrors({
        fallbackError: null,
        hasSubmitted: true,
        serverError: RECOVERY_REQUIRED_ERROR,
        values: DEFAULT_SIGN_IN_CREDENTIALS,
      }).isRecoveryOffered
    ).toBe(true);
  });

  it("offers the recovery for a recovery required posted form", () => {
    expect(
      resolveLoginFormErrors({
        fallbackError: RECOVERY_REQUIRED_ERROR,
        hasSubmitted: false,
        serverError: null,
        values: EMPTY_SIGN_IN_CREDENTIALS,
      }).isRecoveryOffered
    ).toBe(true);
  });

  it("does not offer the recovery without an error", () => {
    expect(
      resolveLoginFormErrors({
        fallbackError: null,
        hasSubmitted: false,
        serverError: null,
        values: EMPTY_SIGN_IN_CREDENTIALS,
      }).isRecoveryOffered
    ).toBe(false);
  });

  it.each(
    Object.values(SIGN_IN_ERROR_CODE).filter(
      (code) =>
        code !==
        SIGN_IN_ERROR_CODE.ACCOUNT_RECOVERY_REQUIRED
    )
  )(
    "does not offer the recovery for the %s server error",
    (code) => {
      expect(
        resolveLoginFormErrors({
          fallbackError: null,
          hasSubmitted: false,
          serverError: createSignInError(code),
          values: DEFAULT_SIGN_IN_CREDENTIALS,
        }).isRecoveryOffered
      ).toBe(false);
    }
  );

  it.each(
    Object.values(SIGN_IN_ERROR_CODE).filter(
      (code) =>
        code !==
        SIGN_IN_ERROR_CODE.ACCOUNT_RECOVERY_REQUIRED
    )
  )(
    "does not offer the recovery for the %s posted form error",
    (code) => {
      expect(
        resolveLoginFormErrors({
          fallbackError: createSignInError(code),
          hasSubmitted: false,
          serverError: null,
          values: DEFAULT_SIGN_IN_CREDENTIALS,
        }).isRecoveryOffered
      ).toBe(false);
    }
  );

  it("does not offer the recovery when a validation error takes the slot", () => {
    expect(
      resolveLoginFormErrors({
        fallbackError: RECOVERY_REQUIRED_ERROR,
        hasSubmitted: true,
        serverError: null,
        values: EMPTY_SIGN_IN_CREDENTIALS,
      }).isRecoveryOffered
    ).toBe(false);
  });
});

import { describe, expect, it } from "vitest";
import { SIGN_IN_ERROR_CODE } from "@/app/constants";
import { DEFAULT_SIGN_IN_CREDENTIALS } from "@/app/utils/sign-in/tests/signIn.constants";
import { EMPTY_SIGN_IN_CREDENTIALS } from "../constants/LoginFormDefaults.constants";
import { SIGN_IN_ERROR_COPY } from "../constants/SignInErrorCopy.constants";
import { resolveLoginFormErrors } from "../utils/resolveLoginFormErrors";
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
});

import { describe, expect, it } from "vitest";
import { SIGN_IN_FIELD } from "@/app/constants/access/SignInError.constants";
import { NO_SIGN_IN_FIELD_ERRORS } from "../constants/LoginFormDefaults.constants";
import { resolveFirstNewFieldError } from "../utils/resolveFirstNewFieldError";
import {
  BOTH_ERRORS,
  FORM_ERRORS,
  PASSWORD_ERRORS,
  USERNAME_ERRORS,
} from "./resolveFirstNewFieldError.constants";

describe("resolveFirstNewFieldError", () => {
  it("returns null when nothing is invalid", () => {
    expect(
      resolveFirstNewFieldError(
        NO_SIGN_IN_FIELD_ERRORS,
        NO_SIGN_IN_FIELD_ERRORS
      )
    ).toBeNull();
  });

  it("returns the field whose error just appeared", () => {
    expect(
      resolveFirstNewFieldError(
        NO_SIGN_IN_FIELD_ERRORS,
        PASSWORD_ERRORS
      )
    ).toBe(SIGN_IN_FIELD.PASSWORD);
  });

  it("puts the username before the password", () => {
    expect(
      resolveFirstNewFieldError(
        NO_SIGN_IN_FIELD_ERRORS,
        BOTH_ERRORS
      )
    ).toBe(SIGN_IN_FIELD.USERNAME);
  });

  it("returns null while an error only stays or goes away", () => {
    expect(
      resolveFirstNewFieldError(BOTH_ERRORS, BOTH_ERRORS)
    ).toBeNull();
    expect(
      resolveFirstNewFieldError(
        BOTH_ERRORS,
        PASSWORD_ERRORS
      )
    ).toBeNull();
  });

  it("skips an error that was already there", () => {
    expect(
      resolveFirstNewFieldError(
        USERNAME_ERRORS,
        BOTH_ERRORS
      )
    ).toBe(SIGN_IN_FIELD.PASSWORD);
  });

  it("does not move focus for a form-only error", () => {
    expect(
      resolveFirstNewFieldError(
        NO_SIGN_IN_FIELD_ERRORS,
        FORM_ERRORS
      )
    ).toBeNull();
  });
});

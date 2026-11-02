import { describe, expect, it } from "vitest";
import { SIGN_IN_FIELD } from "@/app/constants";
import { DEFAULT_SIGN_IN_CREDENTIALS } from "@/app/utils/sign-in/tests/signIn.constants";
import { EMPTY_SIGN_IN_CREDENTIALS } from "../constants/LoginFormDefaults.constants";
import { SIGN_IN_ERROR_COPY } from "../constants/SignInErrorCopy.constants";
import { resolveLoginFormErrors } from "../utils/resolveLoginFormErrors";
import {
  INACTIVITY_NOTICE,
  NO_ERROR_SOURCES,
} from "./resolveLoginFormErrors.constants";
import { INVALID_CREDENTIALS_ERROR } from "./submitSignIn.constants";

describe("resolveLoginFormErrors notice", () => {
  it("shows the notice in the banner before the first submit", () => {
    expect(
      resolveLoginFormErrors({
        ...NO_ERROR_SOURCES,
        notice: INACTIVITY_NOTICE,
      }).fieldErrors[SIGN_IN_FIELD.FORM]
    ).toBe(SIGN_IN_ERROR_COPY[INACTIVITY_NOTICE.code]);
  });

  it("hides the notice once the form was submitted", () => {
    expect(
      resolveLoginFormErrors({
        ...NO_ERROR_SOURCES,
        hasSubmitted: true,
        notice: INACTIVITY_NOTICE,
        values: DEFAULT_SIGN_IN_CREDENTIALS,
      }).fieldErrors[SIGN_IN_FIELD.FORM]
    ).toBeNull();
  });

  it("lets a server error win over the notice", () => {
    expect(
      resolveLoginFormErrors({
        ...NO_ERROR_SOURCES,
        notice: INACTIVITY_NOTICE,
        serverError: INVALID_CREDENTIALS_ERROR,
      }).fieldErrors[SIGN_IN_FIELD.FORM]
    ).toBeNull();
  });

  it("lets a posted form error win over the notice", () => {
    expect(
      resolveLoginFormErrors({
        ...NO_ERROR_SOURCES,
        fallbackError: INVALID_CREDENTIALS_ERROR,
        notice: INACTIVITY_NOTICE,
      }).fieldErrors[SIGN_IN_FIELD.FORM]
    ).toBeNull();
  });

  it("lets a validation error win over the notice", () => {
    expect(
      resolveLoginFormErrors({
        ...NO_ERROR_SOURCES,
        hasSubmitted: true,
        notice: INACTIVITY_NOTICE,
        values: EMPTY_SIGN_IN_CREDENTIALS,
      }).fieldErrors[SIGN_IN_FIELD.FORM]
    ).toBeNull();
  });
});

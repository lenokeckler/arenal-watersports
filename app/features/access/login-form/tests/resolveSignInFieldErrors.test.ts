import { describe, expect, it } from "vitest";
import { NO_SIGN_IN_FIELD_ERRORS } from "../constants/LoginFormDefaults.constants";
import { SIGN_IN_ERROR_COPY } from "../constants/SignInErrorCopy.constants";
import { resolveSignInFieldErrors } from "../utils/resolveSignInFieldErrors";
import { FIELD_ERROR_CASES } from "./resolveSignInFieldErrors.constants";

describe("resolveSignInFieldErrors", () => {
  it("leaves every field without a message when there is no error", () => {
    expect(resolveSignInFieldErrors(null)).toEqual(
      NO_SIGN_IN_FIELD_ERRORS
    );
  });

  it.each(FIELD_ERROR_CASES)(
    "puts the message of the $label error on its own field only",
    ({ error, field }) => {
      expect(resolveSignInFieldErrors(error)).toEqual({
        ...NO_SIGN_IN_FIELD_ERRORS,
        [field]: SIGN_IN_ERROR_COPY[error.code],
      });
    }
  );
});

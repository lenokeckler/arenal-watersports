import { describe, expect, it } from "vitest";
import { PASSWORD_CHANGE_FIELD } from "@/app/constants/access/PasswordChangeError.constants";
import { FIRST_SIGN_IN_ERROR_COPY } from "../constants/FirstSignInErrorCopy.constants";
import { resolvePasswordChangeFormErrors } from "../utils/resolvePasswordChangeFormErrors";
import { CURRENT_PASSWORD_INVALID_ERROR } from "./passwordChangeErrors.constants";
import { EMPTY_CURRENT_PASSWORD_INPUT } from "./resolvePasswordChangeFormErrors.priority.constants";

describe("resolvePasswordChangeFormErrors priority", () => {
  it("shows the server error over the validation error on the same field", () => {
    const errors = resolvePasswordChangeFormErrors({
      errorCopy: FIRST_SIGN_IN_ERROR_COPY,
      hasSubmitted: true,
      serverError: CURRENT_PASSWORD_INVALID_ERROR,
      values: EMPTY_CURRENT_PASSWORD_INPUT,
    });

    expect(
      errors[PASSWORD_CHANGE_FIELD.CURRENT_PASSWORD]
    ).toBe(
      FIRST_SIGN_IN_ERROR_COPY[
        CURRENT_PASSWORD_INVALID_ERROR.code
      ]
    );
  });
});

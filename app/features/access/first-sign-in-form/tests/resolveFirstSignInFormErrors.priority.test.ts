import { describe, expect, it } from "vitest";
import { FIRST_SIGN_IN_FIELD } from "@/app/constants/access/FirstSignInError.constants";
import { FIRST_SIGN_IN_ERROR_COPY } from "../constants/FirstSignInErrorCopy.constants";
import { resolveFirstSignInFormErrors } from "../utils/resolveFirstSignInFormErrors";
import { CURRENT_PASSWORD_INVALID_ERROR } from "./firstSignInErrors.constants";
import { EMPTY_CURRENT_PASSWORD_INPUT } from "./resolveFirstSignInFormErrors.priority.constants";

describe("resolveFirstSignInFormErrors priority", () => {
  it("shows the server error over the validation error on the same field", () => {
    const errors = resolveFirstSignInFormErrors({
      hasSubmitted: true,
      serverError: CURRENT_PASSWORD_INVALID_ERROR,
      values: EMPTY_CURRENT_PASSWORD_INPUT,
    });

    expect(
      errors[FIRST_SIGN_IN_FIELD.CURRENT_PASSWORD]
    ).toBe(
      FIRST_SIGN_IN_ERROR_COPY[
        CURRENT_PASSWORD_INVALID_ERROR.code
      ]
    );
  });
});

import { describe, expect, it } from "vitest";
import { PASSWORD_RECOVERY_FIELD } from "@/app/constants";
import { NO_PASSWORD_RECOVERY_FORM_ERRORS } from "../constants/PasswordRecoveryRequestDefaults.constants";
import { PASSWORD_RECOVERY_RESET_ERROR_COPY } from "../constants/PasswordRecoveryResetErrorCopy.constants";
import { resolvePasswordRecoveryResetErrors } from "../utils/resolvePasswordRecoveryResetErrors";
import {
  NETWORK_ERROR,
  TOO_MANY_REQUESTS_ERROR,
} from "./passwordRecoveryRequest.constants";
import {
  CONFIRMATION_MISMATCH_ERROR,
  NEW_PASSWORD_RULES_ERROR,
  PASSWORD_NOT_SAVED_ERROR,
  PIN_INVALID_ERROR,
  RESET_INPUT,
  UNKNOWN_ERROR,
} from "./passwordRecoveryReset.constants";
import { SHORT_PIN_INPUT } from "./passwordRecoveryResetErrors.constants";

describe("resolvePasswordRecoveryResetErrors server errors", () => {
  it.each([
    [PIN_INVALID_ERROR, PASSWORD_RECOVERY_FIELD.PIN],
    [
      NEW_PASSWORD_RULES_ERROR,
      PASSWORD_RECOVERY_FIELD.NEW_PASSWORD,
    ],
    [
      CONFIRMATION_MISMATCH_ERROR,
      PASSWORD_RECOVERY_FIELD.CONFIRM_PASSWORD,
    ],
    [
      PASSWORD_NOT_SAVED_ERROR,
      PASSWORD_RECOVERY_FIELD.FORM,
    ],
    [UNKNOWN_ERROR, PASSWORD_RECOVERY_FIELD.FORM],
    [NETWORK_ERROR, PASSWORD_RECOVERY_FIELD.FORM],
    [TOO_MANY_REQUESTS_ERROR, PASSWORD_RECOVERY_FIELD.FORM],
  ])(
    "puts the server error %o under %s",
    (serverError, field) => {
      const errors = resolvePasswordRecoveryResetErrors({
        hasSubmitted: false,
        serverError,
        values: RESET_INPUT,
      });

      expect(errors).toEqual({
        ...NO_PASSWORD_RECOVERY_FORM_ERRORS,
        [field]:
          PASSWORD_RECOVERY_RESET_ERROR_COPY[
            serverError.code
          ],
      });
    }
  );

  it("lets the server error win over a client error in the same field", () => {
    const errors = resolvePasswordRecoveryResetErrors({
      hasSubmitted: true,
      serverError: PIN_INVALID_ERROR,
      values: SHORT_PIN_INPUT,
    });

    expect(errors[PASSWORD_RECOVERY_FIELD.PIN]).toBe(
      PASSWORD_RECOVERY_RESET_ERROR_COPY[
        PIN_INVALID_ERROR.code
      ]
    );
  });
});

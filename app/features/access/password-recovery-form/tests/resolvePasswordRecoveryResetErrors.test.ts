import { describe, expect, it } from "vitest";
import {
  ACCESS_SHARED_COPY,
  PASSWORD_RECOVERY_FIELD,
} from "@/app/constants";
import type { PasswordRecoveryPinInput } from "@/app/utils/password-recovery/models/PasswordRecoveryPinInput.interface";
import { NO_PASSWORD_RECOVERY_FORM_ERRORS } from "../constants/PasswordRecoveryRequestDefaults.constants";
import { EMPTY_PASSWORD_RECOVERY_RESET_INPUT } from "../constants/PasswordRecoveryResetDefaults.constants";
import type { PasswordRecoveryFormErrors } from "../models/PasswordRecoveryFormErrors.type";
import { resolvePasswordRecoveryResetErrors } from "../utils/resolvePasswordRecoveryResetErrors";
import { RESET_INPUT } from "./passwordRecoveryReset.constants";
import {
  NO_PIN_INPUT,
  SHORT_PIN_INPUT,
} from "./passwordRecoveryResetErrors.constants";

const resolveAfterSubmit = (
  values: PasswordRecoveryPinInput
): PasswordRecoveryFormErrors =>
  resolvePasswordRecoveryResetErrors({
    hasSubmitted: true,
    serverError: null,
    values,
  });

describe("resolvePasswordRecoveryResetErrors", () => {
  it("shows no error before the first submit even with empty values", () => {
    expect(
      resolvePasswordRecoveryResetErrors({
        hasSubmitted: false,
        serverError: null,
        values: EMPTY_PASSWORD_RECOVERY_RESET_INPUT,
      })
    ).toEqual(NO_PASSWORD_RECOVERY_FORM_ERRORS);
  });

  it("shows the username error first after a submit", () => {
    const errors = resolveAfterSubmit(
      EMPTY_PASSWORD_RECOVERY_RESET_INPUT
    );

    expect(errors[PASSWORD_RECOVERY_FIELD.USERNAME]).toBe(
      ACCESS_SHARED_COPY.USERNAME_REQUIRED
    );
    expect(errors[PASSWORD_RECOVERY_FIELD.PIN]).toBeNull();
  });

  it.each([
    [
      NO_PIN_INPUT,
      PASSWORD_RECOVERY_FIELD.PIN,
      "Escriba el PIN.",
    ],
    [
      SHORT_PIN_INPUT,
      PASSWORD_RECOVERY_FIELD.PIN,
      "El PIN tiene 6 dígitos.",
    ],
  ])(
    "places the error of %o under %s",
    (values, field, text) => {
      const errors = resolveAfterSubmit(values);

      expect(errors).toEqual({
        ...NO_PASSWORD_RECOVERY_FORM_ERRORS,
        [field]: text,
      });
    }
  );

  it("clears every error once the values are valid", () => {
    expect(resolveAfterSubmit(RESET_INPUT)).toEqual(
      NO_PASSWORD_RECOVERY_FORM_ERRORS
    );
  });
});

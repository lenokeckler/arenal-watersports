import { describe, expect, it } from "vitest";
import {
  PASSWORD_RECOVERY_FIELD,
  STRING,
} from "@/app/constants";
import { changePasswordRecoveryResetValue } from "../utils/changePasswordRecoveryResetValue";
import { keepPasswordRecoveryPinDigits } from "../utils/keepPasswordRecoveryPinDigits";
import {
  INHERITED_FIELD_NAMES,
  LETTERS_ONLY_PIN,
  PASTED_PIN,
  PASTED_PIN_DIGITS,
  SPACED_PASSWORD,
  UNRELATED_FIELD_NAME,
  UNRELATED_FIELD_VALUE,
  VALID_PIN,
  VALID_RESET_VALUES,
} from "./passwordRecoveryResetState.constants";

describe("keepPasswordRecoveryPinDigits", () => {
  it("keeps only the digits of a pasted PIN", () => {
    expect(keepPasswordRecoveryPinDigits(PASTED_PIN)).toBe(
      PASTED_PIN_DIGITS
    );
  });

  it("cuts the digits to the PIN length", () => {
    expect(
      keepPasswordRecoveryPinDigits(
        `${VALID_PIN}${VALID_PIN}`
      )
    ).toBe(VALID_PIN);
  });

  it("drops letters entirely", () => {
    expect(
      keepPasswordRecoveryPinDigits(LETTERS_ONLY_PIN)
    ).toBe(STRING.Empty);
  });
});

describe("changePasswordRecoveryResetValue", () => {
  it("changes the PIN through the digit filter", () => {
    expect(
      changePasswordRecoveryResetValue(
        VALID_RESET_VALUES,
        PASSWORD_RECOVERY_FIELD.PIN,
        PASTED_PIN
      ).pin
    ).toBe(PASTED_PIN_DIGITS);
  });

  it("leaves a password exactly as typed", () => {
    expect(
      changePasswordRecoveryResetValue(
        VALID_RESET_VALUES,
        PASSWORD_RECOVERY_FIELD.NEW_PASSWORD,
        SPACED_PASSWORD
      ).newPassword
    ).toBe(SPACED_PASSWORD);
  });

  it("ignores a field that is not part of the form", () => {
    expect(
      changePasswordRecoveryResetValue(
        VALID_RESET_VALUES,
        UNRELATED_FIELD_NAME,
        UNRELATED_FIELD_VALUE
      )
    ).toBe(VALID_RESET_VALUES);
  });

  it.each(INHERITED_FIELD_NAMES)(
    "ignores the inherited name %s",
    (name) => {
      expect(
        changePasswordRecoveryResetValue(
          VALID_RESET_VALUES,
          name,
          UNRELATED_FIELD_VALUE
        )
      ).toBe(VALID_RESET_VALUES);
    }
  );
});

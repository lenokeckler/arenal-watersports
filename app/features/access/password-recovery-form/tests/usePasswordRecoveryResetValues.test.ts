import { describe, expect, it, vi } from "vitest";
import {
  PASSWORD_RECOVERY_FIELD,
  STRING,
} from "@/app/constants";
import {
  OTHER_USERNAME,
  PASTED_PIN,
  PASTED_PIN_DIGITS,
  PREFILLED_USERNAME,
  SPACED_PASSWORD,
  VALID_PIN,
} from "./passwordRecoveryResetState.constants";
import {
  renderValues,
  type,
} from "./passwordRecoveryResetValues.actions";

describe("usePasswordRecoveryResetValues", () => {
  it("starts from the prefilled username with everything else empty", () => {
    const { result } = renderValues();

    expect(result.current.values).toEqual({
      confirmPassword: STRING.Empty,
      newPassword: STRING.Empty,
      pin: STRING.Empty,
      username: PREFILLED_USERNAME,
    });
  });

  it("keeps the username editable", () => {
    const { result } = renderValues();

    type(
      result,
      PASSWORD_RECOVERY_FIELD.USERNAME,
      OTHER_USERNAME
    );

    expect(result.current.values.username).toBe(
      OTHER_USERNAME
    );
  });

  it("keeps only the digits of the PIN and passwords as typed", () => {
    const { result } = renderValues();

    type(result, PASSWORD_RECOVERY_FIELD.PIN, PASTED_PIN);
    type(
      result,
      PASSWORD_RECOVERY_FIELD.NEW_PASSWORD,
      SPACED_PASSWORD
    );

    expect(result.current.values.pin).toBe(
      PASTED_PIN_DIGITS
    );
    expect(result.current.values.newPassword).toBe(
      SPACED_PASSWORD
    );
  });

  it("dismisses the server error on every edit", () => {
    const dismiss = vi.fn();
    const { result } = renderValues(dismiss);

    type(result, PASSWORD_RECOVERY_FIELD.PIN, VALID_PIN);

    expect(dismiss).toHaveBeenCalledOnce();
  });
});

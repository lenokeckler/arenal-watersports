import { describe, expect, it } from "vitest";
import {
  PASSWORD_RECOVERY_ERROR_CODE,
  PASSWORD_RECOVERY_FIELD,
  STRING,
} from "@/app/constants";
import { createPasswordRecoveryError } from "@/app/utils/password-recovery/createPasswordRecoveryError";
import {
  PASSWORD_NOT_SAVED_ERROR,
  PIN_INVALID_ERROR,
  UNKNOWN_ERROR,
} from "./passwordRecoveryReset.constants";
import {
  OTHER_USERNAME,
  VALID_PIN,
} from "./passwordRecoveryResetState.constants";
import {
  fillAll,
  renderValues,
  type,
} from "./passwordRecoveryResetValues.actions";

describe("usePasswordRecoveryResetValues after a server answer", () => {
  it("clears the PIN and keeps the username after a PIN_INVALID server error", () => {
    const { rerender, result } = renderValues();
    fillAll(result);

    rerender({ serverError: PIN_INVALID_ERROR });

    expect(result.current.values.pin).toBe(STRING.Empty);
    expect(result.current.values.username).toBe(
      OTHER_USERNAME
    );
  });

  it.each([UNKNOWN_ERROR, PASSWORD_NOT_SAVED_ERROR])(
    "keeps the PIN after the server error %j",
    (serverError) => {
      const { rerender, result } = renderValues();
      fillAll(result);

      rerender({ serverError });

      expect(result.current.values.pin).toBe(VALID_PIN);
    }
  );

  it("lets the worker type a new PIN after it was cleared", () => {
    const { rerender, result } = renderValues();
    fillAll(result);
    rerender({ serverError: PIN_INVALID_ERROR });

    type(result, PASSWORD_RECOVERY_FIELD.PIN, VALID_PIN);

    expect(result.current.values.pin).toBe(VALID_PIN);
  });

  it("clears a retyped PIN again when the next answer is a new PIN_INVALID", () => {
    const { rerender, result } = renderValues();
    fillAll(result);
    rerender({ serverError: PIN_INVALID_ERROR });
    rerender({ serverError: null });
    type(result, PASSWORD_RECOVERY_FIELD.PIN, VALID_PIN);

    rerender({
      serverError: createPasswordRecoveryError(
        PASSWORD_RECOVERY_ERROR_CODE.PIN_INVALID
      ),
    });

    expect(result.current.values.pin).toBe(STRING.Empty);
  });
});

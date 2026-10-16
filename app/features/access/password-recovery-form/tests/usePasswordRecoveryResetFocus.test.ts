import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { NO_HANDLED_PASSWORD_RECOVERY_FOCUS_TRIGGER } from "../constants/PasswordRecoveryRequestFocus.constants";
import { usePasswordRecoveryResetFocus } from "../hooks/usePasswordRecoveryResetFocus";
import { attachPasswordRecoveryResetInputs } from "./attachPasswordRecoveryResetInputs";
import type { PasswordRecoveryFocusProps } from "./PasswordRecoveryFocusProps.interface";
import {
  BANNER_ERROR_TRIGGER,
  FAILED_SUBMIT_TRIGGER,
  FORM_ERRORS,
  NO_ERRORS_PROPS,
} from "./passwordRecoveryRequestFocus.constants";
import { FOCUS_ORDER_CASES } from "./passwordRecoveryResetFocusCases.constants";

const renderFocus = (
  initial: PasswordRecoveryFocusProps
) => {
  const hook = renderHook(
    ({ errors, trigger }: PasswordRecoveryFocusProps) =>
      usePasswordRecoveryResetFocus(errors, trigger),
    { initialProps: initial }
  );
  return {
    ...hook,
    inputs: attachPasswordRecoveryResetInputs(
      hook.result.current
    ),
  };
};

describe("usePasswordRecoveryResetFocus", () => {
  it("focuses nothing before any submit", () => {
    const { inputs } = renderFocus({
      errors: FOCUS_ORDER_CASES[0][1],
      trigger: NO_HANDLED_PASSWORD_RECOVERY_FOCUS_TRIGGER,
    });

    expect(document.body).toHaveFocus();
    expect(Object.values(inputs)).not.toContain(
      document.activeElement
    );
  });

  it.each(FOCUS_ORDER_CASES)(
    "focuses %s after a failed submit",
    (_label, errors, field) => {
      const { inputs, rerender } =
        renderFocus(NO_ERRORS_PROPS);

      rerender({ errors, trigger: FAILED_SUBMIT_TRIGGER });

      expect(inputs[field]).toHaveFocus();
    }
  );

  it("leaves the focus alone for an error of the whole form", () => {
    const { rerender } = renderFocus(NO_ERRORS_PROPS);

    rerender({
      errors: FORM_ERRORS,
      trigger: BANNER_ERROR_TRIGGER,
    });

    expect(document.body).toHaveFocus();
  });

  it("does not move the focus again while typing after a failed submit", () => {
    const [, errors, field] = FOCUS_ORDER_CASES[0];
    const { inputs, rerender } =
      renderFocus(NO_ERRORS_PROPS);
    rerender({ errors, trigger: FAILED_SUBMIT_TRIGGER });
    inputs[field].blur();

    rerender({ errors, trigger: FAILED_SUBMIT_TRIGGER });

    expect(inputs[field]).not.toHaveFocus();
  });
});

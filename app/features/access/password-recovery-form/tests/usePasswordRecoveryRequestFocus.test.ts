import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { NO_HANDLED_PASSWORD_RECOVERY_FOCUS_TRIGGER } from "../constants/PasswordRecoveryRequestFocus.constants";
import { usePasswordRecoveryRequestFocus } from "../hooks/usePasswordRecoveryRequestFocus";
import { attachPasswordRecoveryRequestInput } from "./attachPasswordRecoveryRequestInput";
import type { PasswordRecoveryFocusProps } from "./PasswordRecoveryFocusProps.interface";
import {
  BANNER_ERROR_TRIGGER,
  FAILED_SUBMIT_TRIGGER,
  FORM_ERRORS,
  NO_ERRORS_PROPS,
  USERNAME_ERRORS,
} from "./passwordRecoveryRequestFocus.constants";

const renderFocus = (
  initial: PasswordRecoveryFocusProps
) => {
  const hook = renderHook(
    ({ errors, trigger }: PasswordRecoveryFocusProps) =>
      usePasswordRecoveryRequestFocus(errors, trigger),
    { initialProps: initial }
  );
  return {
    ...hook,
    input: attachPasswordRecoveryRequestInput(
      hook.result.current
    ),
  };
};

describe("usePasswordRecoveryRequestFocus", () => {
  it("focuses nothing before any submit", () => {
    const { input } = renderFocus({
      errors: USERNAME_ERRORS,
      trigger: NO_HANDLED_PASSWORD_RECOVERY_FOCUS_TRIGGER,
    });

    expect(document.body).toHaveFocus();
    expect(input).not.toHaveFocus();
  });

  it("focuses the username after a failed submit", () => {
    const { input, rerender } =
      renderFocus(NO_ERRORS_PROPS);

    rerender({
      errors: USERNAME_ERRORS,
      trigger: FAILED_SUBMIT_TRIGGER,
    });

    expect(input).toHaveFocus();
  });

  it("leaves the focus alone for an error of the whole form", () => {
    const { input, rerender } =
      renderFocus(NO_ERRORS_PROPS);

    rerender({
      errors: FORM_ERRORS,
      trigger: BANNER_ERROR_TRIGGER,
    });

    expect(input).not.toHaveFocus();
  });

  it("does not move the focus again while typing after a failed submit", () => {
    const { input, rerender } =
      renderFocus(NO_ERRORS_PROPS);
    rerender({
      errors: USERNAME_ERRORS,
      trigger: FAILED_SUBMIT_TRIGGER,
    });
    input.blur();

    rerender({
      errors: USERNAME_ERRORS,
      trigger: FAILED_SUBMIT_TRIGGER,
    });

    expect(input).not.toHaveFocus();
  });
});

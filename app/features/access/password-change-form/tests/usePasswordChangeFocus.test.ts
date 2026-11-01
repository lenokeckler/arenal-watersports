import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PASSWORD_CHANGE_FIELD } from "@/app/constants/access/PasswordChangeError.constants";
import { NO_HANDLED_FOCUS_TRIGGER } from "../constants/PasswordChangeFocus.constants";
import { NO_PASSWORD_CHANGE_FORM_ERRORS } from "../constants/PasswordChangeDefaults.constants";
import { FIRST_SIGN_IN_ERROR_COPY } from "../constants/FirstSignInErrorCopy.constants";
import { usePasswordChangeFocus } from "../hooks/usePasswordChangeFocus";
import type { PasswordChangeFocusTrigger } from "../models/PasswordChangeFocusTrigger.interface";
import type { PasswordChangeFormErrors } from "../models/PasswordChangeFormErrors.type";
import { attachPasswordChangeInputs } from "./attachPasswordChangeInputs";
import type { PasswordChangeFocusProps } from "./PasswordChangeFocusProps.interface";
import { NEW_PASSWORD_RULES_ERROR } from "./passwordChangeErrors.constants";

const FAILED_SUBMIT_TRIGGER: PasswordChangeFocusTrigger = {
  invalidSubmitCount: 1,
  serverError: null,
};
const SECOND_FAILED_SUBMIT_TRIGGER: PasswordChangeFocusTrigger =
  {
    invalidSubmitCount: 2,
    serverError: null,
  };
const NEW_AND_CONFIRM_ERRORS: PasswordChangeFormErrors = {
  ...NO_PASSWORD_CHANGE_FORM_ERRORS,
  [PASSWORD_CHANGE_FIELD.CONFIRM_PASSWORD]: "confirm",
  [PASSWORD_CHANGE_FIELD.NEW_PASSWORD]: "new",
};
const CONFIRM_ONLY_ERRORS: PasswordChangeFormErrors = {
  ...NO_PASSWORD_CHANGE_FORM_ERRORS,
  [PASSWORD_CHANGE_FIELD.CONFIRM_PASSWORD]: "confirm",
};
const SERVER_NEW_PASSWORD_ERRORS: PasswordChangeFormErrors =
  {
    ...NO_PASSWORD_CHANGE_FORM_ERRORS,
    [PASSWORD_CHANGE_FIELD.NEW_PASSWORD]:
      FIRST_SIGN_IN_ERROR_COPY[
        NEW_PASSWORD_RULES_ERROR.code
      ],
  };

const renderFocus = (initial: PasswordChangeFocusProps) => {
  const hook = renderHook(
    ({ errors, trigger }: PasswordChangeFocusProps) =>
      usePasswordChangeFocus(errors, trigger),
    { initialProps: initial }
  );
  return {
    ...hook,
    inputs: attachPasswordChangeInputs(hook.result.current),
  };
};

describe("usePasswordChangeFocus", () => {
  it("focuses nothing before any submit", () => {
    const { inputs } = renderFocus({
      errors: NEW_AND_CONFIRM_ERRORS,
      trigger: NO_HANDLED_FOCUS_TRIGGER,
    });

    expect(document.body).toHaveFocus();
    expect(inputs.newPassword).not.toHaveFocus();
  });

  it("focuses the first field with an error after a failed submit", () => {
    const { inputs, rerender } = renderFocus({
      errors: NO_PASSWORD_CHANGE_FORM_ERRORS,
      trigger: NO_HANDLED_FOCUS_TRIGGER,
    });

    rerender({
      errors: NEW_AND_CONFIRM_ERRORS,
      trigger: FAILED_SUBMIT_TRIGGER,
    });

    expect(inputs.newPassword).toHaveFocus();
  });

  it("does not move the focus when the first error changes while typing", () => {
    const { inputs, rerender } = renderFocus({
      errors: NO_PASSWORD_CHANGE_FORM_ERRORS,
      trigger: NO_HANDLED_FOCUS_TRIGGER,
    });
    rerender({
      errors: NEW_AND_CONFIRM_ERRORS,
      trigger: FAILED_SUBMIT_TRIGGER,
    });

    rerender({
      errors: CONFIRM_ONLY_ERRORS,
      trigger: FAILED_SUBMIT_TRIGGER,
    });

    expect(inputs.newPassword).toHaveFocus();
    expect(inputs.confirmPassword).not.toHaveFocus();
  });

  it("focuses the field of a server error when it arrives", () => {
    const { inputs, rerender } = renderFocus({
      errors: NO_PASSWORD_CHANGE_FORM_ERRORS,
      trigger: NO_HANDLED_FOCUS_TRIGGER,
    });

    rerender({
      errors: SERVER_NEW_PASSWORD_ERRORS,
      trigger: {
        invalidSubmitCount: 0,
        serverError: NEW_PASSWORD_RULES_ERROR,
      },
    });

    expect(inputs.newPassword).toHaveFocus();
  });

  it("focuses again on a second failed submit", () => {
    const { inputs, rerender } = renderFocus({
      errors: NEW_AND_CONFIRM_ERRORS,
      trigger: FAILED_SUBMIT_TRIGGER,
    });
    inputs.newPassword.blur();

    rerender({
      errors: NEW_AND_CONFIRM_ERRORS,
      trigger: SECOND_FAILED_SUBMIT_TRIGGER,
    });

    expect(inputs.newPassword).toHaveFocus();
  });
});

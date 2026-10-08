import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FIRST_SIGN_IN_FIELD } from "@/app/constants/access/FirstSignInError.constants";
import { NO_FIRST_SIGN_IN_FORM_ERRORS } from "../constants/FirstSignInDefaults.constants";
import { FIRST_SIGN_IN_ERROR_COPY } from "../constants/FirstSignInErrorCopy.constants";
import { useFirstSignInFocus } from "../hooks/useFirstSignInFocus";
import type { FirstSignInFocusTrigger } from "../models/FirstSignInFocusTrigger.interface";
import type { FirstSignInFormErrors } from "../models/FirstSignInFormErrors.type";
import { attachFirstSignInInputs } from "./attachFirstSignInInputs";
import { NEW_PASSWORD_RULES_ERROR } from "./firstSignInErrors.constants";

const IDLE_TRIGGER: FirstSignInFocusTrigger = {
  invalidSubmitCount: 0,
  serverError: null,
};
const FAILED_SUBMIT_TRIGGER: FirstSignInFocusTrigger = {
  invalidSubmitCount: 1,
  serverError: null,
};
const NEW_AND_CONFIRM_ERRORS: FirstSignInFormErrors = {
  ...NO_FIRST_SIGN_IN_FORM_ERRORS,
  [FIRST_SIGN_IN_FIELD.CONFIRM_PASSWORD]: "confirm",
  [FIRST_SIGN_IN_FIELD.NEW_PASSWORD]: "new",
};
const CONFIRM_ONLY_ERRORS: FirstSignInFormErrors = {
  ...NO_FIRST_SIGN_IN_FORM_ERRORS,
  [FIRST_SIGN_IN_FIELD.CONFIRM_PASSWORD]: "confirm",
};
const SERVER_NEW_PASSWORD_ERRORS: FirstSignInFormErrors = {
  ...NO_FIRST_SIGN_IN_FORM_ERRORS,
  [FIRST_SIGN_IN_FIELD.NEW_PASSWORD]:
    FIRST_SIGN_IN_ERROR_COPY[NEW_PASSWORD_RULES_ERROR.code],
};

type FocusProps = {
  errors: FirstSignInFormErrors;
  trigger: FirstSignInFocusTrigger;
};

const renderFocus = (initial: FocusProps) => {
  const hook = renderHook(
    ({ errors, trigger }: FocusProps) =>
      useFirstSignInFocus(errors, trigger),
    { initialProps: initial }
  );
  return {
    ...hook,
    inputs: attachFirstSignInInputs(hook.result.current),
  };
};

describe("useFirstSignInFocus", () => {
  it("focuses nothing before any submit", () => {
    const { inputs } = renderFocus({
      errors: NEW_AND_CONFIRM_ERRORS,
      trigger: IDLE_TRIGGER,
    });

    expect(document.body).toHaveFocus();
    expect(inputs.newPassword).not.toHaveFocus();
  });

  it("focuses the first field with an error after a failed submit", () => {
    const { inputs, rerender } = renderFocus({
      errors: NO_FIRST_SIGN_IN_FORM_ERRORS,
      trigger: IDLE_TRIGGER,
    });

    rerender({
      errors: NEW_AND_CONFIRM_ERRORS,
      trigger: FAILED_SUBMIT_TRIGGER,
    });

    expect(inputs.newPassword).toHaveFocus();
  });

  it("does not move the focus when the first error changes while typing", () => {
    const { inputs, rerender } = renderFocus({
      errors: NO_FIRST_SIGN_IN_FORM_ERRORS,
      trigger: IDLE_TRIGGER,
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
      errors: NO_FIRST_SIGN_IN_FORM_ERRORS,
      trigger: IDLE_TRIGGER,
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
});

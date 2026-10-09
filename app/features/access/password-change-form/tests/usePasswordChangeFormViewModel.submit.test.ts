import { startTransition } from "react";
import { act, renderHook } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import "./firstSignInAction.setup";
import { PASSWORD_CHANGE_FIELD } from "@/app/constants/access/PasswordChangeError.constants";
import {
  DEFAULT_PASSWORD_CHANGE_INPUT,
  MISMATCHED_CONFIRMATION,
} from "@/app/utils/password-change/tests/passwordChange.constants";
import { PASSWORD_CHANGE_ERROR_CODE } from "@/app/constants";
import { FIRST_SIGN_IN_ERROR_COPY } from "../constants/FirstSignInErrorCopy.constants";
import { submitFirstPasswordChange } from "../actions/submitFirstPasswordChange";
import { createPasswordChangeFormData } from "./createPasswordChangeFormData";
import { usePasswordChangeFormViewModel } from "../hooks/usePasswordChangeFormViewModel";
import {
  fillForm,
  submitForm,
} from "./passwordChangeFormActions";

describe("usePasswordChangeFormViewModel submit", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("prevents the default submit of an invalid form and shows its error", () => {
    const { result } = renderHook(
      usePasswordChangeFormViewModel
    );

    const event = submitForm(result);

    expect(event.preventDefault).toHaveBeenCalledOnce();
    expect(
      result.current.fieldErrors[
        PASSWORD_CHANGE_FIELD.CURRENT_PASSWORD
      ]
    ).toBe(
      FIRST_SIGN_IN_ERROR_COPY[
        PASSWORD_CHANGE_ERROR_CODE.CURRENT_PASSWORD_REQUIRED
      ]
    );
  });

  it("does not prevent the default submit of a valid form", () => {
    const { result } = renderHook(
      usePasswordChangeFormViewModel
    );
    fillForm(result, DEFAULT_PASSWORD_CHANGE_INPUT);

    const event = submitForm(result);

    expect(event.preventDefault).not.toHaveBeenCalled();
  });

  it("shows the mismatch under the confirmation field", () => {
    const { result } = renderHook(
      usePasswordChangeFormViewModel
    );
    fillForm(result, {
      ...DEFAULT_PASSWORD_CHANGE_INPUT,
      confirmPassword: MISMATCHED_CONFIRMATION,
    });

    submitForm(result);

    expect(
      result.current.fieldErrors[
        PASSWORD_CHANGE_FIELD.CONFIRM_PASSWORD
      ]
    ).toBe(
      FIRST_SIGN_IN_ERROR_COPY[
        PASSWORD_CHANGE_ERROR_CODE.CONFIRMATION_MISMATCH
      ]
    );
  });

  it("ignores a submit while pending", async () => {
    vi.mocked(submitFirstPasswordChange).mockReturnValue(
      new Promise(() => undefined)
    );
    const { result } = renderHook(
      usePasswordChangeFormViewModel
    );
    fillForm(result, DEFAULT_PASSWORD_CHANGE_INPUT);
    await act(() => {
      startTransition(() => {
        result.current.formAction(
          createPasswordChangeFormData(
            DEFAULT_PASSWORD_CHANGE_INPUT
          )
        );
      });
      return Promise.resolve();
    });

    const event = submitForm(result);

    expect(result.current.isPending).toBe(true);
    expect(event.preventDefault).toHaveBeenCalledOnce();
  });
});

import { renderHook } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import "./firstSignInAction.setup";
import { FIRST_SIGN_IN_FIELD } from "@/app/constants/access/FirstSignInError.constants";
import {
  DEFAULT_FIRST_PASSWORD_CHANGE_INPUT,
  MISMATCHED_CONFIRMATION,
} from "@/app/utils/first-sign-in/tests/firstSignIn.constants";
import { FIRST_SIGN_IN_ERROR_CODE } from "@/app/constants";
import { FIRST_SIGN_IN_ERROR_COPY } from "../constants/FirstSignInErrorCopy.constants";
import { useFirstSignInFormViewModel } from "../hooks/useFirstSignInFormViewModel";
import {
  fillForm,
  submitForm,
} from "./firstSignInFormActions";

describe("useFirstSignInFormViewModel submit", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("prevents the default submit of an invalid form and shows its error", () => {
    const { result } = renderHook(
      useFirstSignInFormViewModel
    );

    const event = submitForm(result);

    expect(event.preventDefault).toHaveBeenCalledOnce();
    expect(
      result.current.fieldErrors[
        FIRST_SIGN_IN_FIELD.CURRENT_PASSWORD
      ]
    ).toBe(
      FIRST_SIGN_IN_ERROR_COPY[
        FIRST_SIGN_IN_ERROR_CODE.CURRENT_PASSWORD_REQUIRED
      ]
    );
  });

  it("lets a valid form post to the server action", () => {
    const { result } = renderHook(
      useFirstSignInFormViewModel
    );
    fillForm(result, DEFAULT_FIRST_PASSWORD_CHANGE_INPUT);

    const event = submitForm(result);

    expect(event.preventDefault).not.toHaveBeenCalled();
    expect(result.current.fieldErrors).toEqual(
      expect.objectContaining({
        [FIRST_SIGN_IN_FIELD.CONFIRM_PASSWORD]: null,
      })
    );
  });

  it("shows the mismatch under the confirmation field", () => {
    const { result } = renderHook(
      useFirstSignInFormViewModel
    );
    fillForm(result, {
      ...DEFAULT_FIRST_PASSWORD_CHANGE_INPUT,
      confirmPassword: MISMATCHED_CONFIRMATION,
    });

    submitForm(result);

    expect(
      result.current.fieldErrors[
        FIRST_SIGN_IN_FIELD.CONFIRM_PASSWORD
      ]
    ).toBe(
      FIRST_SIGN_IN_ERROR_COPY[
        FIRST_SIGN_IN_ERROR_CODE.CONFIRMATION_MISMATCH
      ]
    );
  });
});

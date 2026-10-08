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
import { PASSWORD_RULE } from "@/app/constants";
import {
  DEFAULT_FIRST_PASSWORD_CHANGE_INPUT,
  WEAK_PASSWORD,
} from "@/app/utils/first-sign-in/tests/firstSignIn.constants";
import { useFirstSignInFormViewModel } from "../hooks/useFirstSignInFormViewModel";
import { attachFirstSignInInputs } from "./attachFirstSignInInputs";
import {
  fillForm,
  submitForm,
  typeInto,
} from "./firstSignInFormActions";
import { EDITED_VALUE } from "./firstSignInHooks.constants";

describe("useFirstSignInFormViewModel feedback", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("evaluates the password rules of the new password as it is typed", () => {
    const { result } = renderHook(
      useFirstSignInFormViewModel
    );

    typeInto(
      result,
      FIRST_SIGN_IN_FIELD.NEW_PASSWORD,
      WEAK_PASSWORD
    );

    expect(
      result.current.passwordRules[PASSWORD_RULE.LOWERCASE]
    ).toBe(true);
    expect(
      result.current.passwordRules[PASSWORD_RULE.UPPERCASE]
    ).toBe(false);
  });

  it("shows the failures after a failed submit and hides them when the new password changes", () => {
    const { result } = renderHook(
      useFirstSignInFormViewModel
    );
    expect(result.current.showFailures).toBe(false);

    submitForm(result);
    expect(result.current.showFailures).toBe(true);

    typeInto(
      result,
      FIRST_SIGN_IN_FIELD.NEW_PASSWORD,
      WEAK_PASSWORD
    );
    expect(result.current.showFailures).toBe(false);
  });

  it("keeps the failures while another field is edited", () => {
    const { result } = renderHook(
      useFirstSignInFormViewModel
    );
    submitForm(result);

    typeInto(
      result,
      FIRST_SIGN_IN_FIELD.CURRENT_PASSWORD,
      EDITED_VALUE
    );

    expect(result.current.showFailures).toBe(true);
  });

  it("focuses the first field with an error after a failed submit", () => {
    const { result } = renderHook(
      useFirstSignInFormViewModel
    );
    const inputs = attachFirstSignInInputs(
      result.current.fieldRefs
    );
    fillForm(result, {
      ...DEFAULT_FIRST_PASSWORD_CHANGE_INPUT,
      newPassword: WEAK_PASSWORD,
    });

    submitForm(result);

    expect(inputs.newPassword).toHaveFocus();
  });
});

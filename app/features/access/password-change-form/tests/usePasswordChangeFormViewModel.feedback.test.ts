import { renderHook } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import "./firstSignInAction.setup";
import { PASSWORD_CHANGE_FIELD } from "@/app/constants/access/PasswordChangeError.constants";
import { PASSWORD_RULE } from "@/app/constants";
import {
  DEFAULT_PASSWORD_CHANGE_INPUT,
  WEAK_PASSWORD,
} from "@/app/utils/password-change/tests/passwordChange.constants";
import { usePasswordChangeFormViewModel } from "../hooks/usePasswordChangeFormViewModel";
import { attachPasswordChangeInputs } from "./attachPasswordChangeInputs";
import {
  fillForm,
  submitForm,
  typeInto,
} from "./passwordChangeFormActions";
import { EDITED_VALUE } from "./passwordChangeHooks.constants";

describe("usePasswordChangeFormViewModel feedback", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("evaluates the password rules of the new password as it is typed", () => {
    const { result } = renderHook(
      usePasswordChangeFormViewModel
    );

    typeInto(
      result,
      PASSWORD_CHANGE_FIELD.NEW_PASSWORD,
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
      usePasswordChangeFormViewModel
    );
    expect(result.current.showFailures).toBe(false);

    submitForm(result);
    expect(result.current.showFailures).toBe(true);

    typeInto(
      result,
      PASSWORD_CHANGE_FIELD.NEW_PASSWORD,
      WEAK_PASSWORD
    );
    expect(result.current.showFailures).toBe(false);
  });

  it("keeps the failures while another field is edited", () => {
    const { result } = renderHook(
      usePasswordChangeFormViewModel
    );
    submitForm(result);

    typeInto(
      result,
      PASSWORD_CHANGE_FIELD.CURRENT_PASSWORD,
      EDITED_VALUE
    );

    expect(result.current.showFailures).toBe(true);
  });

  it("focuses the first field with an error after a failed submit", () => {
    const { result } = renderHook(
      usePasswordChangeFormViewModel
    );
    const inputs = attachPasswordChangeInputs(
      result.current.fieldRefs
    );
    fillForm(result, {
      ...DEFAULT_PASSWORD_CHANGE_INPUT,
      newPassword: WEAK_PASSWORD,
    });

    submitForm(result);

    expect(inputs.newPassword).toHaveFocus();
  });
});

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
import { DEFAULT_FIRST_PASSWORD_CHANGE_INPUT } from "@/app/utils/first-sign-in/tests/firstSignIn.constants";
import { submitFirstPasswordChange } from "../actions/submitFirstPasswordChange";
import { FIRST_SIGN_IN_ERROR_COPY } from "../constants/FirstSignInErrorCopy.constants";
import { useFirstSignInFormViewModel } from "../hooks/useFirstSignInFormViewModel";
import { attachFirstSignInInputs } from "./attachFirstSignInInputs";
import { createFirstSignInFormData } from "./createFirstSignInFormData";
import {
  CURRENT_PASSWORD_INVALID_ERROR,
  NETWORK_ERROR,
} from "./firstSignInErrors.constants";
import {
  postForm,
  typeInto,
} from "./firstSignInFormActions";
import { EDITED_VALUE } from "./firstSignInHooks.constants";

describe("useFirstSignInFormViewModel server errors", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("shows a server error under its field and focuses it", async () => {
    vi.mocked(submitFirstPasswordChange).mockResolvedValue(
      CURRENT_PASSWORD_INVALID_ERROR
    );
    const { result } = renderHook(
      useFirstSignInFormViewModel
    );
    const inputs = attachFirstSignInInputs(
      result.current.fieldRefs
    );

    await postForm(
      result,
      createFirstSignInFormData(
        DEFAULT_FIRST_PASSWORD_CHANGE_INPUT
      )
    );

    expect(
      result.current.fieldErrors[
        FIRST_SIGN_IN_FIELD.CURRENT_PASSWORD
      ]
    ).toBe(
      FIRST_SIGN_IN_ERROR_COPY[
        CURRENT_PASSWORD_INVALID_ERROR.code
      ]
    );
    expect(inputs.currentPassword).toHaveFocus();
  });

  it("shows a form-level server error in the form slot", async () => {
    vi.mocked(submitFirstPasswordChange).mockResolvedValue(
      NETWORK_ERROR
    );
    const { result } = renderHook(
      useFirstSignInFormViewModel
    );

    await postForm(
      result,
      createFirstSignInFormData(
        DEFAULT_FIRST_PASSWORD_CHANGE_INPUT
      )
    );

    expect(
      result.current.fieldErrors[FIRST_SIGN_IN_FIELD.FORM]
    ).toBe(FIRST_SIGN_IN_ERROR_COPY[NETWORK_ERROR.code]);
  });

  it("clears the server error once the worker edits a field", async () => {
    vi.mocked(submitFirstPasswordChange).mockResolvedValue(
      CURRENT_PASSWORD_INVALID_ERROR
    );
    const { result } = renderHook(
      useFirstSignInFormViewModel
    );
    await postForm(
      result,
      createFirstSignInFormData(
        DEFAULT_FIRST_PASSWORD_CHANGE_INPUT
      )
    );

    typeInto(
      result,
      FIRST_SIGN_IN_FIELD.CURRENT_PASSWORD,
      EDITED_VALUE
    );

    expect(
      result.current.fieldErrors[
        FIRST_SIGN_IN_FIELD.CURRENT_PASSWORD
      ]
    ).toBeNull();
  });
});

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
import { submitFirstPasswordChange } from "../actions/submitFirstPasswordChange";
import { FIRST_SIGN_IN_ERROR_COPY } from "../constants/FirstSignInErrorCopy.constants";
import { useFirstSignInFormViewModel } from "../hooks/useFirstSignInFormViewModel";
import { attachFirstSignInInputs } from "./attachFirstSignInInputs";
import {
  CURRENT_PASSWORD_INVALID_ERROR,
  NETWORK_ERROR,
} from "./firstSignInErrors.constants";
import {
  postDefaultForm,
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

    await postDefaultForm(result.current.formAction);

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

    await postDefaultForm(result.current.formAction);

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
    await postDefaultForm(result.current.formAction);

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

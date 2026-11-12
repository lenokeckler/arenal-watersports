import { act, renderHook } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  SIGN_IN_ERROR_CODE,
  SIGN_IN_FIELD,
} from "@/app/constants";
import { DEFAULT_SIGN_IN_CREDENTIALS } from "@/app/utils/sign-in/tests/signIn.constants";
import { submitSignIn } from "../actions/submitSignIn";
import { SIGN_IN_ERROR_COPY } from "../constants/SignInErrorCopy.constants";
import { useLoginFormViewModel } from "../hooks/useLoginFormViewModel";
import { createChangeEvent } from "./createLoginFormEvents";
import {
  postFormWithoutJavaScript,
  submitForm,
} from "./loginFormActions";
import { INVALID_CREDENTIALS_ERROR } from "./submitSignIn.constants";
import { PARTIAL_PASSWORD } from "./useLoginFormViewModel.constants";

vi.mock("../actions/submitSignIn", () => ({
  submitSignIn: vi.fn(),
}));

describe("useLoginFormViewModel without JavaScript", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(submitSignIn).mockResolvedValue(
      INVALID_CREDENTIALS_ERROR
    );
  });

  it("shows the error of a posted form under its field", async () => {
    const { result } = renderHook(useLoginFormViewModel);

    await postFormWithoutJavaScript(result);

    expect(submitSignIn).toHaveBeenCalledWith(
      DEFAULT_SIGN_IN_CREDENTIALS
    );
    expect(result.current.passwordError).toBe(
      SIGN_IN_ERROR_COPY[
        SIGN_IN_ERROR_CODE.INVALID_CREDENTIALS
      ]
    );
  });

  it("clears the error of a posted form once the worker edits a field", async () => {
    const { result } = renderHook(useLoginFormViewModel);
    await postFormWithoutJavaScript(result);

    act(() => {
      result.current.handlePasswordChange(
        createChangeEvent(PARTIAL_PASSWORD)
      );
    });

    expect(
      result.current.fieldErrors[SIGN_IN_FIELD.PASSWORD]
    ).toBeNull();
  });

  it("replaces the error of a posted form with the next submit's validation", async () => {
    const { result } = renderHook(useLoginFormViewModel);
    await postFormWithoutJavaScript(result);

    await submitForm(result);

    expect(result.current.passwordError).toBeUndefined();
    expect(result.current.usernameError).toBe(
      SIGN_IN_ERROR_COPY[
        SIGN_IN_ERROR_CODE.USERNAME_REQUIRED
      ]
    );
  });
});

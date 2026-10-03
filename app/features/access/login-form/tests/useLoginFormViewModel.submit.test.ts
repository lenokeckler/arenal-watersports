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
import { createSignInError } from "@/app/utils/sign-in/createSignInError";
import type { SignInError } from "@/app/utils/sign-in/models/SignInError.interface";
import { DEFAULT_SIGN_IN_CREDENTIALS } from "@/app/utils/sign-in/tests/signIn.constants";
import { submitSignIn } from "../actions/submitSignIn";
import { SIGN_IN_ERROR_COPY } from "../constants/SignInErrorCopy.constants";
import { useLoginFormViewModel } from "../hooks/useLoginFormViewModel";
import { createChangeEvent } from "./createLoginFormEvents";
import {
  fillValidCredentials,
  submitForm,
} from "./loginFormActions";
import { PARTIAL_PASSWORD } from "./useLoginFormViewModel.constants";

vi.mock("../actions/submitSignIn", () => ({
  submitSignIn: vi.fn(),
}));

describe("useLoginFormViewModel submit", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("submits valid credentials to the action", async () => {
    vi.mocked(submitSignIn).mockResolvedValue(
      createSignInError(
        SIGN_IN_ERROR_CODE.INVALID_CREDENTIALS
      )
    );
    const { result } = renderHook(useLoginFormViewModel);
    fillValidCredentials(result);

    await submitForm(result);

    expect(submitSignIn).toHaveBeenCalledWith(
      DEFAULT_SIGN_IN_CREDENTIALS
    );
  });

  it("keeps the values on a server error and clears it on edit", async () => {
    vi.mocked(submitSignIn).mockResolvedValue(
      createSignInError(
        SIGN_IN_ERROR_CODE.INVALID_CREDENTIALS
      )
    );
    const { result } = renderHook(useLoginFormViewModel);
    fillValidCredentials(result);

    await submitForm(result);

    expect(
      result.current.fieldErrors[SIGN_IN_FIELD.PASSWORD]
    ).toBe(
      SIGN_IN_ERROR_COPY[
        SIGN_IN_ERROR_CODE.INVALID_CREDENTIALS
      ]
    );
    expect(result.current.values).toEqual(
      DEFAULT_SIGN_IN_CREDENTIALS
    );

    act(() => {
      result.current.handlePasswordChange(
        createChangeEvent(PARTIAL_PASSWORD)
      );
    });

    expect(
      result.current.fieldErrors[SIGN_IN_FIELD.PASSWORD]
    ).toBeNull();
  });

  it("ignores a second submit while the first is pending", async () => {
    let resolveAction: (error: SignInError) => void = () =>
      undefined;
    vi.mocked(submitSignIn).mockReturnValue(
      new Promise((resolve) => {
        resolveAction = resolve;
      })
    );
    const { result } = renderHook(useLoginFormViewModel);
    fillValidCredentials(result);

    await submitForm(result);
    await submitForm(result);

    expect(result.current.isPending).toBe(true);
    expect(submitSignIn).toHaveBeenCalledTimes(1);

    await act(async () => {
      resolveAction(
        createSignInError(SIGN_IN_ERROR_CODE.UNKNOWN)
      );
      await Promise.resolve();
    });
  });
});

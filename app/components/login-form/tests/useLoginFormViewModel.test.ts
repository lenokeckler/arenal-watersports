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
import { createSignInError } from "@/app/services/authentication/createSignInError";
import { submitSignIn } from "../actions/submitSignIn";
import { SIGN_IN_ERROR_COPY } from "../constants/SignInErrorCopy.constants";
import { useLoginFormViewModel } from "../hooks/useLoginFormViewModel";
import type { LoginFormResult } from "./LoginFormResult.type";
import {
  createChangeEvent,
  createSubmitEvent,
} from "./createLoginFormEvents";
import {
  PARTIAL_PASSWORD,
  VALID_LOGIN_CREDENTIALS,
} from "./useLoginFormViewModel.constants";

vi.mock("../actions/submitSignIn", () => ({
  submitSignIn: vi.fn(),
}));

const fillValidCredentials = (
  result: LoginFormResult
): void => {
  act(() => {
    result.current.handleUsernameChange(
      createChangeEvent(VALID_LOGIN_CREDENTIALS.username)
    );
    result.current.handlePasswordChange(
      createChangeEvent(VALID_LOGIN_CREDENTIALS.password)
    );
  });
};

describe("useLoginFormViewModel", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("shows the client error after a submit without calling the action", () => {
    const { result } = renderHook(useLoginFormViewModel);

    act(() => {
      result.current.handleSubmit(createSubmitEvent());
    });

    expect(
      result.current.fieldErrors[SIGN_IN_FIELD.USERNAME]
    ).toBe(
      SIGN_IN_ERROR_COPY[
        SIGN_IN_ERROR_CODE.USERNAME_REQUIRED
      ]
    );
    expect(submitSignIn).not.toHaveBeenCalled();
  });

  it("revalidates on change once a submit failed", () => {
    const { result } = renderHook(useLoginFormViewModel);

    act(() => {
      result.current.handleSubmit(createSubmitEvent());
    });
    act(() => {
      result.current.handleUsernameChange(
        createChangeEvent(VALID_LOGIN_CREDENTIALS.username)
      );
    });

    expect(
      result.current.fieldErrors[SIGN_IN_FIELD.USERNAME]
    ).toBeNull();
    expect(
      result.current.fieldErrors[SIGN_IN_FIELD.PASSWORD]
    ).toBe(
      SIGN_IN_ERROR_COPY[
        SIGN_IN_ERROR_CODE.PASSWORD_REQUIRED
      ]
    );
  });

  it("submits valid credentials to the action", async () => {
    vi.mocked(submitSignIn).mockResolvedValue(
      createSignInError(
        SIGN_IN_ERROR_CODE.INVALID_CREDENTIALS
      )
    );
    const { result } = renderHook(useLoginFormViewModel);
    fillValidCredentials(result);

    await act(() =>
      Promise.resolve(
        result.current.handleSubmit(createSubmitEvent())
      )
    );

    expect(submitSignIn).toHaveBeenCalledWith(
      VALID_LOGIN_CREDENTIALS
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

    await act(() =>
      Promise.resolve(
        result.current.handleSubmit(createSubmitEvent())
      )
    );

    expect(
      result.current.fieldErrors[SIGN_IN_FIELD.PASSWORD]
    ).toBe(
      SIGN_IN_ERROR_COPY[
        SIGN_IN_ERROR_CODE.INVALID_CREDENTIALS
      ]
    );
    expect(result.current.values).toEqual(
      VALID_LOGIN_CREDENTIALS
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
});

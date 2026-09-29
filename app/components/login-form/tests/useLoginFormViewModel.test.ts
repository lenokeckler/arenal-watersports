import { act, renderHook } from "@testing-library/react";
import { redirect } from "next/navigation";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  PATHS,
  SIGN_IN_ERROR_CODE,
  SIGN_IN_FIELD,
} from "@/app/constants";
import type { SignInError } from "@/app/services/authentication/models/SignInError.interface";
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
  NETWORK_FAILURE_MESSAGE,
  PARTIAL_PASSWORD,
  REDIRECT_ERROR_MESSAGE,
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

    await act(() =>
      Promise.resolve(
        result.current.handleSubmit(createSubmitEvent())
      )
    );
    await act(() =>
      Promise.resolve(
        result.current.handleSubmit(createSubmitEvent())
      )
    );

    expect(result.current.isPending).toBe(true);
    expect(submitSignIn).toHaveBeenCalledTimes(1);

    await act(async () => {
      resolveAction(
        createSignInError(SIGN_IN_ERROR_CODE.UNKNOWN)
      );
      await Promise.resolve();
    });
  });

  it("drops a server error that arrives after the user edited a field", async () => {
    let resolveAction: (error: SignInError) => void = () =>
      undefined;
    vi.mocked(submitSignIn).mockReturnValue(
      new Promise((resolve) => {
        resolveAction = resolve;
      })
    );
    const { result } = renderHook(useLoginFormViewModel);
    fillValidCredentials(result);

    await act(() =>
      Promise.resolve(
        result.current.handleSubmit(createSubmitEvent())
      )
    );
    act(() => {
      result.current.handlePasswordChange(
        createChangeEvent(PARTIAL_PASSWORD)
      );
    });
    await act(() =>
      Promise.resolve(
        resolveAction(
          createSignInError(
            SIGN_IN_ERROR_CODE.INVALID_CREDENTIALS
          )
        )
      )
    );

    expect(
      result.current.fieldErrors[SIGN_IN_FIELD.PASSWORD]
    ).toBeNull();
  });

  it("shows the network error when the action request fails", async () => {
    vi.mocked(submitSignIn).mockRejectedValue(
      new Error(NETWORK_FAILURE_MESSAGE)
    );
    const { result } = renderHook(useLoginFormViewModel);
    fillValidCredentials(result);

    await act(() =>
      Promise.resolve(
        result.current.handleSubmit(createSubmitEvent())
      )
    );

    expect(
      result.current.fieldErrors[SIGN_IN_FIELD.FORM]
    ).toBe(SIGN_IN_ERROR_COPY[SIGN_IN_ERROR_CODE.NETWORK]);
  });

  it("does not turn a redirect rejection into a network error", async () => {
    vi.mocked(submitSignIn).mockImplementation(() =>
      Promise.resolve().then(() => redirect(PATHS.HOME))
    );
    const { result } = renderHook(useLoginFormViewModel);
    fillValidCredentials(result);

    const submission = async (): Promise<void> => {
      await act(() =>
        Promise.resolve(
          result.current.handleSubmit(createSubmitEvent())
        )
      );
    };

    await expect(submission()).rejects.toThrow(
      REDIRECT_ERROR_MESSAGE
    );
  });

  it("shows the result of a new submit after an edit and a resolved stale one", async () => {
    const resolvers: Array<(error: SignInError) => void> =
      [];
    vi.mocked(submitSignIn).mockImplementation(
      () =>
        new Promise((resolve) => {
          resolvers.push(resolve);
        })
    );
    const { result } = renderHook(useLoginFormViewModel);
    fillValidCredentials(result);

    await act(() =>
      Promise.resolve(
        result.current.handleSubmit(createSubmitEvent())
      )
    );
    fillValidCredentials(result);
    await act(async () => {
      resolvers[0](
        createSignInError(SIGN_IN_ERROR_CODE.UNKNOWN)
      );
      await Promise.resolve();
    });
    await act(() =>
      Promise.resolve(
        result.current.handleSubmit(createSubmitEvent())
      )
    );
    await act(() =>
      Promise.resolve(
        resolvers[1](
          createSignInError(
            SIGN_IN_ERROR_CODE.INVALID_CREDENTIALS
          )
        )
      )
    );

    expect(
      result.current.fieldErrors[SIGN_IN_FIELD.PASSWORD]
    ).not.toBeNull();
    expect(submitSignIn).toHaveBeenCalledTimes(2);
  });

  it("drops a network failure that arrives after the user edited a field", async () => {
    let rejectAction: (reason: Error) => void = () =>
      undefined;
    vi.mocked(submitSignIn).mockReturnValue(
      new Promise((_resolve, reject) => {
        rejectAction = reject;
      })
    );
    const { result } = renderHook(useLoginFormViewModel);
    fillValidCredentials(result);

    await act(() =>
      Promise.resolve(
        result.current.handleSubmit(createSubmitEvent())
      )
    );
    fillValidCredentials(result);
    await act(() =>
      Promise.resolve(
        rejectAction(new Error(NETWORK_FAILURE_MESSAGE))
      )
    );

    expect(
      result.current.fieldErrors[SIGN_IN_FIELD.FORM]
    ).toBeNull();
  });
});

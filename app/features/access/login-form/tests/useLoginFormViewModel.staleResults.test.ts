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
import { submitSignIn } from "../actions/submitSignIn";
import { useLoginFormViewModel } from "../hooks/useLoginFormViewModel";
import { createChangeEvent } from "./createLoginFormEvents";
import {
  fillValidCredentials,
  submitForm,
} from "./loginFormActions";
import {
  NETWORK_FAILURE_MESSAGE,
  PARTIAL_PASSWORD,
} from "./useLoginFormViewModel.constants";
import { deferSignInResult } from "./deferSignInResult";
import { SIGN_IN_CALL_COUNT } from "./SignInSubmissionCount.constants";

vi.mock("../actions/submitSignIn", () => ({
  submitSignIn: vi.fn(),
}));

describe("useLoginFormViewModel stale results", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("drops a server error that arrives after the user edited a field", async () => {
    const pendingSignIn = deferSignInResult();
    vi.mocked(submitSignIn).mockReturnValue(
      pendingSignIn.promise
    );
    const { result } = renderHook(useLoginFormViewModel);
    fillValidCredentials(result);

    await submitForm(result);
    act(() => {
      result.current.handlePasswordChange(
        createChangeEvent(PARTIAL_PASSWORD)
      );
    });
    await act(() =>
      Promise.resolve(
        pendingSignIn.resolve(
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

  it("shows the result of a new submit after an edit and a resolved stale one", async () => {
    const staleSignIn = deferSignInResult();
    const newSignIn = deferSignInResult();
    vi.mocked(submitSignIn)
      .mockReturnValueOnce(staleSignIn.promise)
      .mockReturnValueOnce(newSignIn.promise);
    const { result } = renderHook(useLoginFormViewModel);
    fillValidCredentials(result);

    await submitForm(result);
    fillValidCredentials(result);
    await act(async () => {
      staleSignIn.resolve(
        createSignInError(SIGN_IN_ERROR_CODE.UNKNOWN)
      );
      await Promise.resolve();
    });
    await submitForm(result);
    await act(() =>
      Promise.resolve(
        newSignIn.resolve(
          createSignInError(
            SIGN_IN_ERROR_CODE.INVALID_CREDENTIALS
          )
        )
      )
    );

    expect(
      result.current.fieldErrors[SIGN_IN_FIELD.PASSWORD]
    ).not.toBeNull();
    expect(submitSignIn).toHaveBeenCalledTimes(
      SIGN_IN_CALL_COUNT.TWO_SUBMITS
    );
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

    await submitForm(result);
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

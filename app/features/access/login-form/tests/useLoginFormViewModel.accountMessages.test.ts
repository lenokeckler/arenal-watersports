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
import { SIGN_IN_ERROR_COPY } from "../constants/SignInErrorCopy.constants";
import { useLoginFormViewModel } from "../hooks/useLoginFormViewModel";
import { ACCOUNT_BLOCK_CODES } from "./accountMessages.constants";
import { createChangeEvent } from "./createLoginFormEvents";
import {
  fillValidCredentials,
  postFormWithoutJavaScript,
  submitForm,
} from "./loginFormActions";
import { INACTIVITY_NOTICE } from "./resolveLoginFormErrors.constants";
import { INVALID_CREDENTIALS_ERROR } from "./submitSignIn.constants";
import { PARTIAL_PASSWORD } from "./useLoginFormViewModel.constants";

vi.mock("../actions/submitSignIn", () => ({
  submitSignIn: vi.fn(),
}));

describe("useLoginFormViewModel account messages", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it.each(ACCOUNT_BLOCK_CODES)(
    "shows %s in the banner and under no field after a submit",
    async (code) => {
      vi.mocked(submitSignIn).mockResolvedValue(
        createSignInError(code)
      );
      const { result } = renderHook(useLoginFormViewModel);
      fillValidCredentials(result);

      await submitForm(result);

      expect(
        result.current.fieldErrors[SIGN_IN_FIELD.FORM]
      ).toBe(SIGN_IN_ERROR_COPY[code]);
      expect(result.current.passwordError).toBeUndefined();
      expect(result.current.usernameError).toBeUndefined();
    }
  );

  it.each(ACCOUNT_BLOCK_CODES)(
    "shows %s in the banner when the form is posted without JavaScript",
    async (code) => {
      vi.mocked(submitSignIn).mockResolvedValue(
        createSignInError(code)
      );
      const { result } = renderHook(useLoginFormViewModel);

      await postFormWithoutJavaScript(result);

      expect(
        result.current.fieldErrors[SIGN_IN_FIELD.FORM]
      ).toBe(SIGN_IN_ERROR_COPY[code]);
      expect(result.current.passwordError).toBeUndefined();
    }
  );

  it("shows a posted block message instead of the inactivity notice", async () => {
    vi.mocked(submitSignIn).mockResolvedValue(
      createSignInError(
        SIGN_IN_ERROR_CODE.ACCOUNT_BLOCKED_BY_ATTEMPTS
      )
    );
    const { result } = renderHook(useLoginFormViewModel, {
      initialProps: { notice: INACTIVITY_NOTICE },
    });

    await postFormWithoutJavaScript(result);

    expect(
      result.current.fieldErrors[SIGN_IN_FIELD.FORM]
    ).toBe(
      SIGN_IN_ERROR_COPY[
        SIGN_IN_ERROR_CODE.ACCOUNT_BLOCKED_BY_ATTEMPTS
      ]
    );
  });

  it("keeps the notice while the worker edits before the first submit", () => {
    const { result } = renderHook(useLoginFormViewModel, {
      initialProps: { notice: INACTIVITY_NOTICE },
    });

    fillValidCredentials(result);

    expect(
      result.current.fieldErrors[SIGN_IN_FIELD.FORM]
    ).toBe(SIGN_IN_ERROR_COPY[INACTIVITY_NOTICE.code]);
  });

  it("does not bring the notice back when the worker edits after a submit", async () => {
    vi.mocked(submitSignIn).mockResolvedValue(
      INVALID_CREDENTIALS_ERROR
    );
    const { result } = renderHook(useLoginFormViewModel, {
      initialProps: { notice: INACTIVITY_NOTICE },
    });
    fillValidCredentials(result);
    await submitForm(result);

    act(() => {
      result.current.handlePasswordChange(
        createChangeEvent(PARTIAL_PASSWORD)
      );
    });

    expect(
      result.current.fieldErrors[SIGN_IN_FIELD.FORM]
    ).toBeNull();
  });
});

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
import { submitForm } from "./loginFormActions";

vi.mock("../actions/submitSignIn", () => ({
  submitSignIn: vi.fn(),
}));

describe("useLoginFormViewModel validation", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("shows the client error after a submit without calling the action", async () => {
    const { result } = renderHook(useLoginFormViewModel);

    await submitForm(result);

    expect(
      result.current.fieldErrors[SIGN_IN_FIELD.USERNAME]
    ).toBe(
      SIGN_IN_ERROR_COPY[
        SIGN_IN_ERROR_CODE.USERNAME_REQUIRED
      ]
    );
    expect(submitSignIn).not.toHaveBeenCalled();
  });

  it("revalidates on change once a submit failed", async () => {
    const { result } = renderHook(useLoginFormViewModel);

    await submitForm(result);
    act(() => {
      result.current.handleUsernameChange(
        createChangeEvent(
          DEFAULT_SIGN_IN_CREDENTIALS.username
        )
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
});

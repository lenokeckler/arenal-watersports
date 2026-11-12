import { renderHook } from "@testing-library/react";
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
import { submitSignIn } from "../actions/submitSignIn";
import { SIGN_IN_ERROR_COPY } from "../constants/SignInErrorCopy.constants";
import { useLoginFormViewModel } from "../hooks/useLoginFormViewModel";
import {
  fillValidCredentials,
  submitForm,
} from "./loginFormActions";
import { REDIRECT_SIGNAL_MESSAGE } from "./submitSignIn.constants";
import { NETWORK_FAILURE_MESSAGE } from "./useLoginFormViewModel.constants";

vi.mock("../actions/submitSignIn", () => ({
  submitSignIn: vi.fn(),
}));

describe("useLoginFormViewModel failures", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("shows the network error when the action request fails", async () => {
    vi.mocked(submitSignIn).mockRejectedValue(
      new Error(NETWORK_FAILURE_MESSAGE)
    );
    const { result } = renderHook(useLoginFormViewModel);
    fillValidCredentials(result);

    await submitForm(result);

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

    await expect(submitForm(result)).rejects.toThrow(
      REDIRECT_SIGNAL_MESSAGE
    );
  });
});

import { renderHook } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { SIGN_IN_FIELD } from "@/app/constants";
import { submitSignIn } from "../actions/submitSignIn";
import { SIGN_IN_ERROR_COPY } from "../constants/SignInErrorCopy.constants";
import { useLoginFormViewModel } from "../hooks/useLoginFormViewModel";
import {
  fillValidCredentials,
  submitForm,
} from "./loginFormActions";
import { INACTIVITY_NOTICE } from "./resolveLoginFormErrors.constants";
import { INVALID_CREDENTIALS_ERROR } from "./submitSignIn.constants";

vi.mock("../actions/submitSignIn", () => ({
  submitSignIn: vi.fn(),
}));

const renderWithNotice = () =>
  renderHook(useLoginFormViewModel, {
    initialProps: { notice: INACTIVITY_NOTICE },
  });

describe("useLoginFormViewModel notice", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("shows the notice before any submit", () => {
    const { result } = renderWithNotice();

    expect(
      result.current.fieldErrors[SIGN_IN_FIELD.FORM]
    ).toBe(SIGN_IN_ERROR_COPY[INACTIVITY_NOTICE.code]);
  });

  it("hides the notice after the first submit", async () => {
    vi.mocked(submitSignIn).mockResolvedValue(
      INVALID_CREDENTIALS_ERROR
    );
    const { result } = renderWithNotice();
    fillValidCredentials(result);

    await submitForm(result);

    expect(
      result.current.fieldErrors[SIGN_IN_FIELD.FORM]
    ).toBeNull();
  });

  it("shows the validation error instead of the notice", async () => {
    const { result } = renderWithNotice();

    await submitForm(result);

    expect(
      result.current.fieldErrors[SIGN_IN_FIELD.FORM]
    ).toBeNull();
    expect(result.current.usernameError).toBeDefined();
  });
});

import { render } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { DEFAULT_SIGN_IN_CREDENTIALS } from "@/app/utils/sign-in/tests/signIn.constants";
import { submitSignIn } from "../actions/submitSignIn";
import { SIGN_IN_ERROR_COPY } from "../constants/SignInErrorCopy.constants";
import LoginFormView from "../LoginFormView";
import { createLoginFormViewPage } from "./LoginFormView.page";
import { INVALID_CREDENTIALS_ERROR } from "./submitSignIn.constants";
import { SIGN_IN_CALL_COUNT } from "./SignInSubmissionCount.constants";

vi.mock("../actions/submitSignIn", () => ({
  submitSignIn: vi.fn(),
}));

describe("LoginFormView submission", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("signs in once through the hydrated form and never posts it as well", async () => {
    vi.mocked(submitSignIn).mockResolvedValue(
      INVALID_CREDENTIALS_ERROR
    );
    render(<LoginFormView />);
    const page = createLoginFormViewPage();

    await page.fillCredentials(DEFAULT_SIGN_IN_CREDENTIALS);
    await page.submit();

    expect(
      await page.findText(
        SIGN_IN_ERROR_COPY[INVALID_CREDENTIALS_ERROR.code]
      )
    ).toBeInTheDocument();
    expect(submitSignIn).toHaveBeenCalledTimes(
      SIGN_IN_CALL_COUNT.ONE_SUBMIT
    );
  });
});

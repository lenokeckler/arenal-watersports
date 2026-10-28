import { render } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { DEFAULT_SIGN_IN_CREDENTIALS } from "@/app/utils/sign-in/tests/signIn.constants";
import { createSignInError } from "@/app/utils/sign-in/createSignInError";
import { submitSignIn } from "../actions/submitSignIn";
import { SIGN_IN_ERROR_COPY } from "../constants/SignInErrorCopy.constants";
import LoginFormView from "../LoginFormView";
import { ACCOUNT_BLOCK_CODES } from "./accountMessages.constants";
import { createLoginFormViewPage } from "./LoginFormView.page";
import { renderLoginFormView } from "./renderLoginFormView";
import { INACTIVITY_NOTICE } from "./resolveLoginFormErrors.constants";
import { INVALID_CREDENTIALS_ERROR } from "./submitSignIn.constants";

vi.mock("../actions/submitSignIn", () => ({
  submitSignIn: vi.fn(),
}));

describe("LoginFormView account messages", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it.each(ACCOUNT_BLOCK_CODES)(
    "announces %s in the alert banner",
    async (code) => {
      vi.mocked(submitSignIn).mockResolvedValue(
        createSignInError(code)
      );
      const page = renderLoginFormView();
      await page.fillCredentials(
        DEFAULT_SIGN_IN_CREDENTIALS
      );

      await page.submit();

      expect(await page.findBanner()).toHaveTextContent(
        SIGN_IN_ERROR_COPY[code]
      );
    }
  );

  it("replaces the inactivity notice with the block message", async () => {
    const [code] = ACCOUNT_BLOCK_CODES;
    vi.mocked(submitSignIn).mockResolvedValue(
      createSignInError(code)
    );
    render(<LoginFormView notice={INACTIVITY_NOTICE} />);
    const page = createLoginFormViewPage();
    await page.fillCredentials(DEFAULT_SIGN_IN_CREDENTIALS);

    await page.submit();

    expect(await page.findBanner()).toHaveTextContent(
      SIGN_IN_ERROR_COPY[code]
    );
    expect(page.queryBanner()).not.toHaveTextContent(
      SIGN_IN_ERROR_COPY[INACTIVITY_NOTICE.code]
    );
  });

  it("shows no banner for a wrong password", async () => {
    vi.mocked(submitSignIn).mockResolvedValue(
      INVALID_CREDENTIALS_ERROR
    );
    const page = renderLoginFormView();
    await page.fillCredentials(DEFAULT_SIGN_IN_CREDENTIALS);

    await page.submit();

    expect(
      await page.findText(
        SIGN_IN_ERROR_COPY[INVALID_CREDENTIALS_ERROR.code]
      )
    ).toBeInTheDocument();
    expect(page.queryBanner()).not.toBeInTheDocument();
  });
});

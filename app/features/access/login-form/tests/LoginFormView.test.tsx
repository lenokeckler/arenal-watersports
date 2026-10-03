import { render, waitFor } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  INPUT_TYPES,
  SIGN_IN_ERROR_CODE,
} from "@/app/constants";
import { submitSignIn } from "../actions/submitSignIn";
import { LOGIN_FORM_COPY } from "../constants/LoginFormCopy.constants";
import { SIGN_IN_ERROR_COPY } from "../constants/SignInErrorCopy.constants";
import LoginFormView from "../LoginFormView";
import { createLoginFormViewPage } from "./LoginFormView.page";
import { PASSWORD_TOGGLE_COPY } from "@/app/components/field-factory/constants/PasswordToggleCopy.constants";
import { DEFAULT_SIGN_IN_CREDENTIALS } from "@/app/utils/sign-in/tests/signIn.constants";
import {
  ARIA_DESCRIBEDBY_ATTRIBUTE,
  ARIA_INVALID_ATTRIBUTE,
  ARIA_INVALID_VALUE,
  EXTRA_USERNAME_TEXT,
  INVALID_CREDENTIALS_ERROR,
  KEYBOARD_TEXT,
  MULTI_CHARACTER_USERNAME,
  NETWORK_ERROR,
  PASSWORD_ERROR_ID,
  TYPE_ATTRIBUTE,
  USERNAME_ERROR_ID,
} from "./LoginFormView.constants";
import {
  ARIA_DISABLED_ATTRIBUTE,
  ARIA_DISABLED_TRUE,
} from "./LoginFormControls.constants";

vi.mock("../actions/submitSignIn", () => ({
  submitSignIn: vi.fn(),
}));

const renderView = () => {
  render(<LoginFormView />);
  return createLoginFormViewPage();
};

describe("LoginFormView", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("renders both fields with their labels and the submit", () => {
    const page = renderView();

    expect(page.getUsernameInput()).toBeInTheDocument();
    expect(page.getPasswordInput()).toBeInTheDocument();
    expect(page.getIdleSubmit()).toBeInTheDocument();
  });

  it("links the username error to the field without calling the action", async () => {
    const page = renderView();

    await page.submit();

    expect(
      await page.findText(
        SIGN_IN_ERROR_COPY[
          SIGN_IN_ERROR_CODE.USERNAME_REQUIRED
        ]
      )
    ).toHaveAttribute("id", USERNAME_ERROR_ID);
    expect(page.getUsernameInput()).toHaveAttribute(
      ARIA_INVALID_ATTRIBUTE,
      ARIA_INVALID_VALUE
    );
    expect(page.getUsernameInput()).toHaveAttribute(
      ARIA_DESCRIBEDBY_ATTRIBUTE,
      USERNAME_ERROR_ID
    );
    expect(submitSignIn).not.toHaveBeenCalled();
  });

  it("shows invalid credentials under the password field", async () => {
    vi.mocked(submitSignIn).mockResolvedValue(
      INVALID_CREDENTIALS_ERROR
    );
    const page = renderView();

    await page.fillCredentials(DEFAULT_SIGN_IN_CREDENTIALS);
    await page.submit();

    expect(
      await page.findText(
        SIGN_IN_ERROR_COPY[
          SIGN_IN_ERROR_CODE.INVALID_CREDENTIALS
        ]
      )
    ).toHaveAttribute("id", PASSWORD_ERROR_ID);
  });

  it("focuses the username after an empty submit", async () => {
    const page = renderView();

    await page.submit();

    await waitFor(() =>
      expect(page.getUsernameInput()).toHaveFocus()
    );
  });

  it("keeps the focus on the username while typing after an empty submit", async () => {
    const page = renderView();

    await page.submit();
    await waitFor(() =>
      expect(page.getUsernameInput()).toHaveFocus()
    );
    await page.typeUsername(MULTI_CHARACTER_USERNAME);

    expect(page.getUsernameInput()).toHaveFocus();
    expect(page.getUsernameInput()).toHaveValue(
      MULTI_CHARACTER_USERNAME
    );
    expect(page.getPasswordInput()).not.toHaveFocus();
  });

  it("focuses the password on invalid credentials and keeps focus while typing", async () => {
    vi.mocked(submitSignIn).mockResolvedValue(
      INVALID_CREDENTIALS_ERROR
    );
    const page = renderView();

    await page.fillCredentials(VALID_LOGIN_CREDENTIALS);
    await page.submit();

    await waitFor(() =>
      expect(page.getPasswordInput()).toHaveFocus()
    );

    await page.typeUsername(EXTRA_USERNAME_TEXT);

    expect(page.getUsernameInput()).toHaveFocus();
  });

  it("keeps the focus on the password while typing after invalid credentials", async () => {
    vi.mocked(submitSignIn).mockResolvedValue(
      INVALID_CREDENTIALS_ERROR
    );
    const page = renderView();

    await page.fillCredentials(VALID_LOGIN_CREDENTIALS);
    await page.submit();
    await waitFor(() =>
      expect(page.getPasswordInput()).toHaveFocus()
    );
    await page.typeWithoutClicking(KEYBOARD_TEXT);

    expect(page.getPasswordInput()).toHaveFocus();
    expect(page.getUsernameInput()).not.toHaveFocus();
  });

  it("focuses the password again when a second submit returns the same error", async () => {
    vi.mocked(submitSignIn).mockResolvedValue(
      INVALID_CREDENTIALS_ERROR
    );
    const page = renderView();

    await page.fillCredentials(VALID_LOGIN_CREDENTIALS);
    await page.submit();
    await waitFor(() =>
      expect(page.getPasswordInput()).toHaveFocus()
    );
    await page.typeUsername(EXTRA_USERNAME_TEXT);
    await page.submit();

    await waitFor(() =>
      expect(page.getPasswordInput()).toHaveFocus()
    );
    expect(submitSignIn).toHaveBeenCalledTimes(2);
  });

  it("does not move the focus when the result is stale", async () => {
    let resolveSignIn: (
      error: typeof INVALID_CREDENTIALS_ERROR
    ) => void = () => undefined;
    vi.mocked(submitSignIn).mockReturnValue(
      new Promise((resolve) => {
        resolveSignIn = resolve;
      })
    );
    const page = renderView();

    await page.fillCredentials(VALID_LOGIN_CREDENTIALS);
    await page.submit();
    await page.typeUsername(EXTRA_USERNAME_TEXT);
    resolveSignIn(INVALID_CREDENTIALS_ERROR);

    await waitFor(() =>
      expect(page.getIdleSubmit()).toBeInTheDocument()
    );
    expect(page.getUsernameInput()).toHaveFocus();
    expect(page.getPasswordInput()).not.toHaveFocus();
  });

  it("does not move the focus to a field for a network error", async () => {
    vi.mocked(submitSignIn).mockResolvedValue(
      NETWORK_ERROR
    );
    const page = renderView();

    await page.fillCredentials(VALID_LOGIN_CREDENTIALS);
    await page.submit();
    await page.findBanner();

    expect(page.getUsernameInput()).not.toHaveFocus();
    expect(page.getPasswordInput()).not.toHaveFocus();
  });

  it("announces a network error in the banner", async () => {
    vi.mocked(submitSignIn).mockResolvedValue(
      NETWORK_ERROR
    );
    const page = renderView();

    await page.fillCredentials(DEFAULT_SIGN_IN_CREDENTIALS);
    await page.submit();

    expect(await page.findBanner()).toHaveTextContent(
      SIGN_IN_ERROR_COPY[SIGN_IN_ERROR_CODE.NETWORK]
    );
  });

  it("toggles the password visibility and its label", async () => {
    const page = renderView();

    expect(page.getPasswordInput()).toHaveAttribute(
      TYPE_ATTRIBUTE,
      INPUT_TYPES.PASSWORD
    );

    await page.clickToggle(PASSWORD_TOGGLE_COPY.SHOW);

    expect(page.getPasswordInput()).toHaveAttribute(
      TYPE_ATTRIBUTE,
      INPUT_TYPES.TEXT
    );
    expect(
      page.getToggle(PASSWORD_TOGGLE_COPY.HIDE)
    ).toBeInTheDocument();
  });

  it("marks the submit aria-disabled while pending", async () => {
    vi.mocked(submitSignIn).mockReturnValue(
      new Promise(() => undefined)
    );
    const page = renderView();

    await page.fillCredentials(DEFAULT_SIGN_IN_CREDENTIALS);
    await page.submit();

    expect(
      await page.findText(LOGIN_FORM_COPY.SUBMITTING)
    ).toBeInTheDocument();
    expect(page.getPendingSubmit()).toHaveAttribute(
      ARIA_DISABLED_ATTRIBUTE,
      ARIA_DISABLED_TRUE
    );
  });
});

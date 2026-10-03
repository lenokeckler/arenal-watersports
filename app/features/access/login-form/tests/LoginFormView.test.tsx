import { render } from "@testing-library/react";
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
import { VALID_LOGIN_CREDENTIALS } from "./useLoginFormViewModel.constants";
import { createLoginFormViewPage } from "./LoginFormView.page";
import {
  ARIA_DESCRIBEDBY_ATTRIBUTE,
  ARIA_INVALID_ATTRIBUTE,
  ARIA_INVALID_VALUE,
  INVALID_CREDENTIALS_ERROR,
  NETWORK_ERROR,
  PASSWORD_ERROR_ID,
  PASSWORD_TOGGLE_HIDE_LABEL,
  PASSWORD_TOGGLE_SHOW_LABEL,
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

    await page.fillCredentials(VALID_LOGIN_CREDENTIALS);
    await page.submit();

    expect(
      await page.findText(
        SIGN_IN_ERROR_COPY[
          SIGN_IN_ERROR_CODE.INVALID_CREDENTIALS
        ]
      )
    ).toHaveAttribute("id", PASSWORD_ERROR_ID);
  });

  it("announces a network error in the banner", async () => {
    vi.mocked(submitSignIn).mockResolvedValue(
      NETWORK_ERROR
    );
    const page = renderView();

    await page.fillCredentials(VALID_LOGIN_CREDENTIALS);
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

    await page.clickToggle(PASSWORD_TOGGLE_SHOW_LABEL);

    expect(page.getPasswordInput()).toHaveAttribute(
      TYPE_ATTRIBUTE,
      INPUT_TYPES.TEXT
    );
    expect(
      page.getToggle(PASSWORD_TOGGLE_HIDE_LABEL)
    ).toBeInTheDocument();
  });

  it("marks the submit aria-disabled while pending", async () => {
    vi.mocked(submitSignIn).mockReturnValue(
      new Promise(() => undefined)
    );
    const page = renderView();

    await page.fillCredentials(VALID_LOGIN_CREDENTIALS);
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

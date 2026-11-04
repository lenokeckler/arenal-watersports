import { waitFor } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import "./firstSignInAction.setup";
import {
  AUTOCOMPLETE,
  PASSWORD_CHANGE_ERROR_CODE,
} from "@/app/constants";
import { DEFAULT_PASSWORD_CHANGE_INPUT } from "@/app/utils/password-change/tests/passwordChange.constants";
import { submitFirstPasswordChange } from "../actions/submitFirstPasswordChange";
import { FIRST_SIGN_IN_ERROR_COPY } from "../constants/FirstSignInErrorCopy.constants";
import { NETWORK_ERROR } from "./passwordChangeErrors.constants";
import {
  AUTOCOMPLETE_ATTRIBUTE,
  READONLY_ATTRIBUTE,
} from "./PasswordChangeFormView.constants";
import { renderPasswordChangeFormView as renderView } from "./renderPasswordChangeFormView";

describe("PasswordChangeFormView states", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("hints the password manager which field is which", () => {
    const page = renderView();

    expect(page.getCurrentInput()).toHaveAttribute(
      AUTOCOMPLETE_ATTRIBUTE,
      AUTOCOMPLETE.CURRENT_PASSWORD
    );
    expect(page.getNewInput()).toHaveAttribute(
      AUTOCOMPLETE_ATTRIBUTE,
      AUTOCOMPLETE.NEW_PASSWORD
    );
    expect(page.getConfirmInput()).toHaveAttribute(
      AUTOCOMPLETE_ATTRIBUTE,
      AUTOCOMPLETE.NEW_PASSWORD
    );
  });

  it("announces a form-wide error as an alert", async () => {
    vi.mocked(submitFirstPasswordChange).mockResolvedValue(
      NETWORK_ERROR
    );
    const page = renderView();

    await page.fill(DEFAULT_PASSWORD_CHANGE_INPUT);
    await page.submit();

    expect(await page.findBanner()).toHaveTextContent(
      FIRST_SIGN_IN_ERROR_COPY[
        PASSWORD_CHANGE_ERROR_CODE.NETWORK
      ]
    );
  });

  it("shows the saving label and locks the fields while pending", async () => {
    let settle: () => void = () => undefined;
    vi.mocked(submitFirstPasswordChange).mockReturnValue(
      new Promise((resolve) => {
        settle = () => resolve(null);
      })
    );
    const page = renderView();

    await page.fill(DEFAULT_PASSWORD_CHANGE_INPUT);
    await page.submit();

    await waitFor(() =>
      expect(page.getPendingSubmit()).toBeInTheDocument()
    );
    expect(page.getNewInput()).toHaveAttribute(
      READONLY_ATTRIBUTE
    );
    settle();
    await waitFor(() =>
      expect(page.queryPendingSubmit()).toBeNull()
    );
  });
});

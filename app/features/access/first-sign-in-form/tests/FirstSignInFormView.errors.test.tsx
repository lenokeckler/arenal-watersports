import { waitFor } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import "./firstSignInAction.setup";
import { FIRST_SIGN_IN_ERROR_CODE } from "@/app/constants";
import {
  DEFAULT_FIRST_PASSWORD_CHANGE_INPUT,
  MISMATCHED_CONFIRMATION,
} from "@/app/utils/first-sign-in/tests/firstSignIn.constants";
import { submitFirstPasswordChange } from "../actions/submitFirstPasswordChange";
import { FIRST_SIGN_IN_ERROR_COPY } from "../constants/FirstSignInErrorCopy.constants";
import {
  CURRENT_PASSWORD_INVALID_ERROR,
  NETWORK_ERROR,
} from "./firstSignInErrors.constants";
import {
  CONFIRM_PASSWORD_ERROR_ID,
  CURRENT_PASSWORD_ERROR_ID,
} from "./FirstSignInFormView.constants";
import { renderFirstSignInFormView as renderView } from "./renderFirstSignInFormView";

describe("FirstSignInFormView errors", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("shows the confirmation mismatch under the confirmation field", async () => {
    const page = renderView();

    await page.fill({
      ...DEFAULT_FIRST_PASSWORD_CHANGE_INPUT,
      confirmPassword: MISMATCHED_CONFIRMATION,
    });
    await page.submit();

    expect(
      await page.findText(
        FIRST_SIGN_IN_ERROR_COPY[
          FIRST_SIGN_IN_ERROR_CODE.CONFIRMATION_MISMATCH
        ]
      )
    ).toHaveAttribute("id", CONFIRM_PASSWORD_ERROR_ID);
    expect(
      submitFirstPasswordChange
    ).not.toHaveBeenCalled();
  });

  it("shows a server error under its own field", async () => {
    vi.mocked(submitFirstPasswordChange).mockResolvedValue(
      CURRENT_PASSWORD_INVALID_ERROR
    );
    const page = renderView();

    await page.fill(DEFAULT_FIRST_PASSWORD_CHANGE_INPUT);
    await page.submit();

    expect(
      await page.findText(
        FIRST_SIGN_IN_ERROR_COPY[
          CURRENT_PASSWORD_INVALID_ERROR.code
        ]
      )
    ).toHaveAttribute("id", CURRENT_PASSWORD_ERROR_ID);
  });

  it("keeps the typed values after a network error", async () => {
    vi.mocked(submitFirstPasswordChange).mockResolvedValue(
      NETWORK_ERROR
    );
    const page = renderView();

    await page.fill(DEFAULT_FIRST_PASSWORD_CHANGE_INPUT);
    await page.submit();
    await page.findBanner();

    await waitFor(() =>
      expect(page.getCurrentInput()).toHaveValue(
        DEFAULT_FIRST_PASSWORD_CHANGE_INPUT.currentPassword
      )
    );
    expect(page.getNewInput()).toHaveValue(
      DEFAULT_FIRST_PASSWORD_CHANGE_INPUT.newPassword
    );
    expect(page.getConfirmInput()).toHaveValue(
      DEFAULT_FIRST_PASSWORD_CHANGE_INPUT.confirmPassword
    );
  });
});

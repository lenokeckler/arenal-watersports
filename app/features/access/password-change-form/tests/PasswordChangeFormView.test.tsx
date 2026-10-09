import { waitFor } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import "./firstSignInAction.setup";
import { PASSWORD_CHANGE_ERROR_CODE } from "@/app/constants";
import {
  DEFAULT_PASSWORD_CHANGE_INPUT,
  WEAK_PASSWORD,
} from "@/app/utils/password-change/tests/passwordChange.constants";
import { submitFirstPasswordChange } from "../actions/submitFirstPasswordChange";
import { FIRST_SIGN_IN_ERROR_COPY } from "../constants/FirstSignInErrorCopy.constants";
import {
  PASSWORD_CHANGE_NEW_PASSWORD_DESCRIBED_BY,
  PASSWORD_CHANGE_RULES_ID,
} from "../constants/PasswordChangeRules.constants";
import {
  ARIA_DESCRIBEDBY_ATTRIBUTE,
  ARIA_INVALID_ATTRIBUTE,
  ARIA_INVALID_VALUE,
  CURRENT_PASSWORD_ERROR_ID,
  NEW_PASSWORD_DESCRIPTION_WITH_ERROR,
  RULE_COUNT,
} from "./PasswordChangeFormView.constants";
import { renderPasswordChangeFormView as renderView } from "./renderPasswordChangeFormView";

describe("PasswordChangeFormView", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("shows the rules before anything is typed and wires the new password to them", () => {
    const page = renderView();

    expect(page.getItems()).toHaveLength(RULE_COUNT);
    expect(page.getList()).toHaveAttribute(
      "id",
      PASSWORD_CHANGE_RULES_ID
    );
    expect(page.getNewInput()).toHaveAttribute(
      ARIA_DESCRIBEDBY_ATTRIBUTE,
      PASSWORD_CHANGE_NEW_PASSWORD_DESCRIBED_BY
    );
  });

  it("blocks an empty submit, shows the error under the field and focuses it", async () => {
    const page = renderView();

    await page.submit();

    expect(
      await page.findText(
        FIRST_SIGN_IN_ERROR_COPY[
          PASSWORD_CHANGE_ERROR_CODE
            .CURRENT_PASSWORD_REQUIRED
        ]
      )
    ).toHaveAttribute("id", CURRENT_PASSWORD_ERROR_ID);
    expect(page.getCurrentInput()).toHaveAttribute(
      ARIA_INVALID_ATTRIBUTE,
      ARIA_INVALID_VALUE
    );
    await waitFor(() =>
      expect(page.getCurrentInput()).toHaveFocus()
    );
    expect(
      submitFirstPasswordChange
    ).not.toHaveBeenCalled();
  });

  it("lists the error id before the rules id on the new password", async () => {
    const page = renderView();

    await page.fill({
      ...DEFAULT_PASSWORD_CHANGE_INPUT,
      newPassword: WEAK_PASSWORD,
    });
    await page.submit();

    await waitFor(() =>
      expect(page.getNewInput()).toHaveAttribute(
        ARIA_DESCRIBEDBY_ATTRIBUTE,
        NEW_PASSWORD_DESCRIPTION_WITH_ERROR
      )
    );
    expect(
      submitFirstPasswordChange
    ).not.toHaveBeenCalled();
  });

  it("posts the three typed values to the server action once for a valid form", async () => {
    let submitted = new FormData();
    vi.mocked(submitFirstPasswordChange).mockImplementation(
      (_previousError, formData) => {
        submitted = formData;
        return Promise.resolve(null);
      }
    );
    const page = renderView();

    await page.fill(DEFAULT_PASSWORD_CHANGE_INPUT);
    await page.submit();

    await waitFor(() =>
      expect(
        submitFirstPasswordChange
      ).toHaveBeenCalledOnce()
    );
    expect(Object.fromEntries(submitted)).toEqual(
      DEFAULT_PASSWORD_CHANGE_INPUT
    );
  });
});

import { render } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  PASSWORD_CHANGE_ERROR_CODE,
  PATHS,
  PROFILE_SCREEN_TITLE_ID,
} from "@/app/constants";
import { DEFAULT_PASSWORD_CHANGE_INPUT } from "@/app/utils/password-change/tests/passwordChange.constants";
import { submitOwnPasswordChange } from "../actions/submitOwnPasswordChange";
import { PROFILE_PASSWORD_ERROR_COPY } from "../constants/ProfilePasswordErrorCopy.constants";
import ProfilePasswordForm from "../ProfilePasswordForm";
import { isNodeBefore } from "./isNodeBefore";
import {
  ARIA_HIDDEN_ATTRIBUTE,
  ARIA_HIDDEN_VALUE,
  HREF_ATTRIBUTE,
  ID_ATTRIBUTE,
} from "./ProfilePasswordForm.constants";
import { createProfilePasswordFormPage } from "./ProfilePasswordForm.page";

vi.mock("../actions/submitOwnPasswordChange", () => ({
  submitOwnPasswordChange: vi.fn(),
}));

const renderProfilePasswordForm = () => {
  render(<ProfilePasswordForm />);
  return createProfilePasswordFormPage();
};

describe("ProfilePasswordForm", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(submitOwnPasswordChange).mockResolvedValue(
      null
    );
  });

  it("titles the screen with the id the layout card points at", () => {
    const page = renderProfilePasswordForm();

    expect(page.getTitle()).toHaveAttribute(
      ID_ATTRIBUTE,
      PROFILE_SCREEN_TITLE_ID
    );
  });

  it("shows the logo and the instruction", () => {
    const page = renderProfilePasswordForm();

    expect(page.getLogo()).toBeVisible();
    expect(page.getInstruction()).toBeVisible();
  });

  it("labels the three fields with the profile copy", () => {
    const page = renderProfilePasswordForm();

    expect(page.getCurrentInput()).toBeVisible();
    expect(page.getNewInput()).toBeVisible();
    expect(page.getConfirmInput()).toBeVisible();
  });

  it("shows the password rules before anything is typed", () => {
    const page = renderProfilePasswordForm();

    expect(page.getRulesTitle()).toBeVisible();
  });

  it("links back to the profile after the submit button", () => {
    const page = renderProfilePasswordForm();

    expect(page.getBackLink()).toHaveAttribute(
      HREF_ATTRIBUTE,
      PATHS.PROFILE.ROOT
    );
    expect(
      isNodeBefore(page.getSubmit(), page.getBackLink())
    ).toBe(true);
  });

  it("hides the back arrow from assistive technology", () => {
    const page = renderProfilePasswordForm();

    expect(page.getArrowIcon()).toHaveAttribute(
      ARIA_HIDDEN_ATTRIBUTE,
      ARIA_HIDDEN_VALUE
    );
  });

  it("explains an empty submit with the profile copy and sends nothing", async () => {
    const page = renderProfilePasswordForm();

    await page.submit();

    expect(
      await page.findText(
        PROFILE_PASSWORD_ERROR_COPY[
          PASSWORD_CHANGE_ERROR_CODE
            .CURRENT_PASSWORD_REQUIRED
        ]
      )
    ).toBeVisible();
    expect(submitOwnPasswordChange).not.toHaveBeenCalled();
  });

  it("sends a complete form to the own password change action", async () => {
    const page = renderProfilePasswordForm();

    await page.fill(DEFAULT_PASSWORD_CHANGE_INPUT);
    await page.submit();

    await vi.waitFor(() =>
      expect(submitOwnPasswordChange).toHaveBeenCalledOnce()
    );
  });
});

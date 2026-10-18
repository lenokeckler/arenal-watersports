import { render } from "@testing-library/react";
import { redirect } from "next/navigation";
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
import { readSignedInUsername } from "@/app/services/authentication";
import { DEFAULT_PASSWORD_CHANGE_INPUT } from "@/app/utils/password-change/tests/passwordChange.constants";
import { submitOwnPasswordChange } from "../actions/submitOwnPasswordChange";
import { PROFILE_PASSWORD_ERROR_COPY } from "../constants/ProfilePasswordErrorCopy.constants";
import ProfilePasswordForm from "../ProfilePasswordForm";
import { isNodeBefore } from "@/app/utils/dom/tests/isNodeBefore";
import {
  ARIA_HIDDEN_ATTRIBUTE,
  ARIA_HIDDEN_VALUE,
  HREF_ATTRIBUTE,
  ID_ATTRIBUTE,
  REDIRECT_SIGNAL_MESSAGE,
  SIGNED_IN_USERNAME,
} from "./ProfilePasswordForm.constants";
import { createProfilePasswordFormPage } from "./ProfilePasswordForm.page";

vi.mock("../actions/submitOwnPasswordChange", () => ({
  submitOwnPasswordChange: vi.fn(),
}));

vi.mock("@/app/services/authentication", () => ({
  readSignedInUsername: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

const renderProfilePasswordForm = async () => {
  render(await ProfilePasswordForm());
  return createProfilePasswordFormPage();
};

describe("ProfilePasswordForm", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(submitOwnPasswordChange).mockResolvedValue(
      null
    );
    vi.mocked(readSignedInUsername).mockResolvedValue(
      SIGNED_IN_USERNAME
    );
    vi.mocked(redirect).mockImplementation(() => {
      throw new Error(REDIRECT_SIGNAL_MESSAGE);
    });
  });

  it("titles the screen with the id the layout card points at", async () => {
    const page = await renderProfilePasswordForm();

    expect(page.getTitle()).toHaveAttribute(
      ID_ATTRIBUTE,
      PROFILE_SCREEN_TITLE_ID
    );
  });

  it("shows the logo and the instruction", async () => {
    const page = await renderProfilePasswordForm();

    expect(page.getLogo()).toBeVisible();
    expect(page.getInstruction()).toBeVisible();
  });

  it("labels the three fields with the profile copy", async () => {
    const page = await renderProfilePasswordForm();

    expect(page.getCurrentInput()).toBeVisible();
    expect(page.getNewInput()).toBeVisible();
    expect(page.getConfirmInput()).toBeVisible();
  });

  it("shows the password rules before anything is typed", async () => {
    const page = await renderProfilePasswordForm();

    expect(page.getRulesTitle()).toBeVisible();
  });

  it("links back to the profile after the submit button", async () => {
    const page = await renderProfilePasswordForm();

    expect(page.getBackLink()).toHaveAttribute(
      HREF_ATTRIBUTE,
      PATHS.PROFILE.ROOT
    );
    expect(
      isNodeBefore(page.getSubmit(), page.getBackLink())
    ).toBe(true);
  });

  it("hides the back arrow from assistive technology", async () => {
    const page = await renderProfilePasswordForm();

    expect(page.getArrowIcon()).toHaveAttribute(
      ARIA_HIDDEN_ATTRIBUTE,
      ARIA_HIDDEN_VALUE
    );
  });

  it("hands the signed-in username to the password manager before the fields", async () => {
    const page = await renderProfilePasswordForm();

    const usernameInput = page.getUsernameInput(
      SIGNED_IN_USERNAME
    );

    expect(
      isNodeBefore(usernameInput, page.getCurrentInput())
    ).toBe(true);
  });

  it("sends the visitor to the login when nobody is signed in", async () => {
    vi.mocked(readSignedInUsername).mockResolvedValue(null);

    await expect(ProfilePasswordForm()).rejects.toThrow(
      REDIRECT_SIGNAL_MESSAGE
    );
    expect(redirect).toHaveBeenCalledExactlyOnceWith(
      PATHS.ACCESS.LOGIN
    );
  });

  it("explains an empty submit with the profile copy and sends nothing", async () => {
    const page = await renderProfilePasswordForm();

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
    const page = await renderProfilePasswordForm();

    await page.fill(DEFAULT_PASSWORD_CHANGE_INPUT);
    await page.submit();

    await vi.waitFor(() =>
      expect(submitOwnPasswordChange).toHaveBeenCalledOnce()
    );
  });
});

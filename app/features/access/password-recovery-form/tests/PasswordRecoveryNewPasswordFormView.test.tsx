import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import { PASSWORD_RULES_COPY } from "@/app/components/password-rules-checklist/constants/PasswordRulesCopy.constants";
import { PASSWORD_RECOVERY_NEW_PASSWORD_COPY } from "../constants/PasswordRecoveryNewPasswordCopy.constants";
import { PASSWORD_RECOVERY_RESET_ERROR_COPY } from "../constants/PasswordRecoveryResetErrorCopy.constants";
import PasswordRecoveryNewPasswordFormView from "../PasswordRecoveryNewPasswordFormView";
import {
  MISMATCHED_CONFIRMATION,
  NEW_PASSWORD_VALUE,
  PASSWORD_NOT_SAVED_ERROR,
  RESET_EXPIRED_ERROR,
} from "./passwordRecoveryNewPassword.constants";

const renderView = (
  action = vi.fn().mockResolvedValue(null)
) => {
  render(
    <PasswordRecoveryNewPasswordFormView action={action} />
  );

  return { action, user: userEvent.setup() };
};

const getNewPassword = () =>
  screen.getByLabelText(
    PASSWORD_RECOVERY_NEW_PASSWORD_COPY.NEW_PASSWORD_LABEL,
    { exact: true }
  );

const getConfirmPassword = () =>
  screen.getByLabelText(
    PASSWORD_RECOVERY_NEW_PASSWORD_COPY.CONFIRM_PASSWORD_LABEL,
    { exact: true }
  );

const getSubmit = () =>
  screen.getByRole(ARIA_ROLE.BUTTON, {
    name: PASSWORD_RECOVERY_NEW_PASSWORD_COPY.SUBMIT,
  });

describe("PasswordRecoveryNewPasswordFormView", () => {
  it("asks only for the new password and its confirmation", () => {
    renderView();

    expect(
      screen.getByText(
        PASSWORD_RECOVERY_NEW_PASSWORD_COPY.HEADING
      )
    ).toBeInTheDocument();
    expect(getNewPassword()).toBeInTheDocument();
    expect(getConfirmPassword()).toBeInTheDocument();
    expect(
      screen.queryByLabelText(/PIN/)
    ).not.toBeInTheDocument();
  });

  it("shows the password rules before typing", () => {
    renderView();

    expect(
      screen.getByText(PASSWORD_RULES_COPY.TITLE)
    ).toBeInTheDocument();
  });

  it("shows no PIN confirmation and no another-PIN link before an error", () => {
    renderView();

    expect(
      screen.queryByText(/El PIN es correcto/)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole(ARIA_ROLE.LINK, {
        name: PASSWORD_RECOVERY_NEW_PASSWORD_COPY.REQUEST_ANOTHER_PIN,
      })
    ).not.toBeInTheDocument();
  });

  it("blocks a mismatched confirmation in the browser", async () => {
    const { action, user } = renderView();

    await user.type(getNewPassword(), NEW_PASSWORD_VALUE);
    await user.type(
      getConfirmPassword(),
      MISMATCHED_CONFIRMATION
    );
    await user.click(getSubmit());

    expect(action).not.toHaveBeenCalled();
    expect(
      getConfirmPassword()
    ).toHaveAccessibleDescription(
      expect.stringContaining(
        PASSWORD_RECOVERY_RESET_ERROR_COPY.confirmationMismatch
      )
    );
  });

  it("shows the expired pass in the banner", async () => {
    const { user } = renderView(
      vi.fn().mockResolvedValue(RESET_EXPIRED_ERROR)
    );

    await user.type(getNewPassword(), NEW_PASSWORD_VALUE);
    await user.type(
      getConfirmPassword(),
      NEW_PASSWORD_VALUE
    );
    await user.click(getSubmit());

    expect(
      await screen.findByRole(ARIA_ROLE.ALERT)
    ).toHaveTextContent(
      PASSWORD_RECOVERY_RESET_ERROR_COPY.resetExpired
    );
    expect(
      screen.getByRole(ARIA_ROLE.LINK, {
        name: PASSWORD_RECOVERY_NEW_PASSWORD_COPY.REQUEST_ANOTHER_PIN,
      })
    ).toHaveAttribute("href", PATHS.ACCESS.RECOVERY);
  });

  it("keeps the another-PIN link away from other errors", async () => {
    const { user } = renderView(
      vi.fn().mockResolvedValue(PASSWORD_NOT_SAVED_ERROR)
    );

    await user.type(getNewPassword(), NEW_PASSWORD_VALUE);
    await user.type(
      getConfirmPassword(),
      NEW_PASSWORD_VALUE
    );
    await user.click(getSubmit());

    await screen.findByRole(ARIA_ROLE.ALERT);
    expect(
      screen.queryByRole(ARIA_ROLE.LINK, {
        name: PASSWORD_RECOVERY_NEW_PASSWORD_COPY.REQUEST_ANOTHER_PIN,
      })
    ).not.toBeInTheDocument();
  });
});

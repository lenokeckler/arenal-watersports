import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ARIA_ROLE } from "@/app/constants";
import PasswordRecoveryNoEmailNote from "../components/PasswordRecoveryNoEmailNote";
import PasswordRecoveryResetNotice from "../components/PasswordRecoveryResetNotice";
import { PASSWORD_RECOVERY_REQUEST_COPY } from "../constants/PasswordRecoveryRequestCopy.constants";
import { PASSWORD_RECOVERY_RESET_COPY } from "../constants/PasswordRecoveryResetCopy.constants";

describe("PasswordRecoveryNoEmailNote", () => {
  it("tells workers without an email to ask administration", () => {
    render(<PasswordRecoveryNoEmailNote />);

    expect(
      screen.getByText(
        PASSWORD_RECOVERY_REQUEST_COPY.NO_EMAIL_NOTE
      )
    ).toBeVisible();
  });
});

describe("PasswordRecoveryResetNotice", () => {
  it("announces the neutral confirmation as a status", () => {
    render(<PasswordRecoveryResetNotice />);

    expect(
      screen.getByRole(ARIA_ROLE.STATUS)
    ).toHaveTextContent(
      PASSWORD_RECOVERY_RESET_COPY.CONFIRMATION
    );
  });
});

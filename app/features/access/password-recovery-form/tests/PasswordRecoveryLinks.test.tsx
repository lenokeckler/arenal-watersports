import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import PasswordRecoveryBackLink from "../components/PasswordRecoveryBackLink";
import PasswordRecoveryPinNote from "../components/PasswordRecoveryPinNote";
import { PASSWORD_RECOVERY_REQUEST_COPY } from "../constants/PasswordRecoveryRequestCopy.constants";
import { PASSWORD_RECOVERY_RESET_COPY } from "../constants/PasswordRecoveryResetCopy.constants";
import { HREF_ATTRIBUTE } from "./passwordRecoveryScreen.constants";

describe("PasswordRecoveryBackLink", () => {
  it("goes back to the login", () => {
    render(<PasswordRecoveryBackLink />);

    expect(
      screen.getByRole(ARIA_ROLE.LINK, {
        name: PASSWORD_RECOVERY_REQUEST_COPY.BACK,
      })
    ).toHaveAttribute(HREF_ATTRIBUTE, PATHS.ACCESS.LOGIN);
  });
});

describe("PasswordRecoveryPinNote", () => {
  it("keeps the help folded until the question is tapped", async () => {
    const user = userEvent.setup();
    render(<PasswordRecoveryPinNote />);
    const help = [
      screen.getByText(
        PASSWORD_RECOVERY_RESET_COPY.NOT_RECEIVED_NOTE
      ),
      screen.getByText(
        PASSWORD_RECOVERY_REQUEST_COPY.NO_EMAIL_NOTE
      ),
    ];

    help.forEach((note) => expect(note).not.toBeVisible());

    await user.click(
      screen.getByText(
        PASSWORD_RECOVERY_RESET_COPY.NOT_RECEIVED_TITLE
      )
    );

    help.forEach((note) => expect(note).toBeVisible());
  });

  it("keeps the link to ask for another PIN in sight", () => {
    render(<PasswordRecoveryPinNote />);

    const link = screen.getByRole(ARIA_ROLE.LINK, {
      name: PASSWORD_RECOVERY_RESET_COPY.REQUEST_ANOTHER_PIN,
    });

    expect(link).toBeVisible();
    expect(link).toHaveAttribute(
      HREF_ATTRIBUTE,
      PATHS.ACCESS.RECOVERY
    );
  });
});

import { render, screen } from "@testing-library/react";
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
  it("explains what to do when the PIN does not arrive", () => {
    render(<PasswordRecoveryPinNote />);

    expect(
      screen.getByText(
        PASSWORD_RECOVERY_RESET_COPY.NOT_RECEIVED_NOTE
      )
    ).toBeVisible();
  });

  it("links back to the request step to ask for another PIN", () => {
    render(<PasswordRecoveryPinNote />);

    expect(
      screen.getByRole(ARIA_ROLE.LINK, {
        name: PASSWORD_RECOVERY_RESET_COPY.REQUEST_ANOTHER_PIN,
      })
    ).toHaveAttribute(
      HREF_ATTRIBUTE,
      PATHS.ACCESS.RECOVERY
    );
  });
});

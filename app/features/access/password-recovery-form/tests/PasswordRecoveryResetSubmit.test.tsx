import { describe, expect, it } from "vitest";
import { ARIA_ROLE } from "@/app/constants";
import { PASSWORD_RECOVERY_RESET_COPY } from "../constants/PasswordRecoveryResetCopy.constants";
import {
  ARIA_DISABLED_ATTRIBUTE,
  FORM_ERROR_MESSAGE,
  TRUE_VALUE,
} from "./passwordRecoveryResetSections.constants";
import { FALSE_VALUE } from "./passwordRecoveryScreen.constants";
import { renderResetSubmit } from "./PasswordRecoveryResetSections.page";

describe("PasswordRecoveryResetSubmit", () => {
  it("shows no banner without a form error", () => {
    const page = renderResetSubmit();

    expect(page.getAlert()).toBeNull();
  });

  it("shows the form error in a banner placed before the button", () => {
    const page = renderResetSubmit({
      error: FORM_ERROR_MESSAGE,
    });

    expect(page.getAlert()).toHaveTextContent(
      FORM_ERROR_MESSAGE
    );
    expect(page.getChildOrder()).toEqual([
      ARIA_ROLE.ALERT,
      null,
    ]);
  });

  it("offers the save label while idle", () => {
    const page = renderResetSubmit();

    expect(page.getButton()).toHaveTextContent(
      PASSWORD_RECOVERY_RESET_COPY.SUBMIT
    );
    expect(page.getButton()).toHaveAttribute(
      ARIA_DISABLED_ATTRIBUTE,
      FALSE_VALUE
    );
  });

  it("disables the button and shows the pending label while pending", () => {
    const page = renderResetSubmit({ isPending: true });

    expect(page.getButton()).toHaveAttribute(
      ARIA_DISABLED_ATTRIBUTE,
      TRUE_VALUE
    );
    expect(page.getButton()).toHaveTextContent(
      PASSWORD_RECOVERY_RESET_COPY.SUBMITTING
    );
  });
});

import { screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PASSWORD_RECOVERY_RESET_COPY } from "../constants/PasswordRecoveryResetCopy.constants";
import { READONLY_PROPERTY } from "./passwordRecoveryScreen.constants";
import {
  ARIA_DISABLED_ATTRIBUTE,
  PROGRESS_ICON_NAME,
  SINGLE_SPINNER,
  TRUE_VALUE,
} from "./passwordRecoveryView.constants";
import type { PasswordRecoveryServerAction } from "../models/PasswordRecoveryServerAction.type";
import { renderPasswordRecoveryResetFormView } from "./renderPasswordRecoveryResetFormView";

describe("PasswordRecoveryResetFormView while saving", () => {
  it("locks every field and the submit button", async () => {
    const page = renderPasswordRecoveryResetFormView({
      action: vi.fn<PasswordRecoveryServerAction>(
        () => new Promise(() => undefined)
      ),
    });
    await page.fillValid();

    await page.clickSubmit();

    await waitFor(() =>
      expect(page.getSubmit()).toHaveTextContent(
        PASSWORD_RECOVERY_RESET_COPY.SUBMITTING
      )
    );
    expect(page.getSubmit()).toHaveAttribute(
      ARIA_DISABLED_ATTRIBUTE,
      TRUE_VALUE
    );
    [
      page.getUsernameInput(),
      page.getPinInput(),
      page.getNewPasswordInput(),
      page.getConfirmInput(),
    ].forEach((input) =>
      expect(input).toHaveProperty(READONLY_PROPERTY, true)
    );
    expect(
      screen.getAllByText(PROGRESS_ICON_NAME)
    ).toHaveLength(SINGLE_SPINNER);
  });
});

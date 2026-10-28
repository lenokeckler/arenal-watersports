import { render, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import PasswordRecoveryPage from "@/app/access/recovery/page";
import PasswordRecoveryResetPage from "@/app/access/recovery/reset/page";
import { readPasswordRecoveryUsername } from "@/app/services/password-recovery";
import { submitPasswordRecoveryRequest } from "../actions/submitPasswordRecoveryRequest";
import { submitPasswordRecoveryReset } from "../actions/submitPasswordRecoveryReset";
import { ACCEPTED_USERNAME } from "./passwordRecoveryPrefill.constants";
import { createPasswordRecoveryRequestFormViewPage } from "./PasswordRecoveryRequestFormView.page";
import { createPasswordRecoveryResetFormViewPage } from "./PasswordRecoveryResetFormView.page";

vi.mock("@/app/services/password-recovery", () => ({
  readPasswordRecoveryUsername: vi.fn(),
}));

vi.mock("../actions/submitPasswordRecoveryRequest", () => ({
  submitPasswordRecoveryRequest: vi.fn(),
}));

vi.mock("../actions/submitPasswordRecoveryReset", () => ({
  submitPasswordRecoveryReset: vi.fn(),
}));

describe("recovery pages wired to their forms", () => {
  it("posts the request form to its server action", async () => {
    vi.mocked(
      submitPasswordRecoveryRequest
    ).mockResolvedValue(null);
    render(<PasswordRecoveryPage />);
    const page =
      createPasswordRecoveryRequestFormViewPage();

    await page.typeUsername(ACCEPTED_USERNAME);
    await page.clickSubmit();

    await waitFor(() =>
      expect(
        submitPasswordRecoveryRequest
      ).toHaveBeenCalled()
    );
  });

  it("prefills the reset username and posts to its server action", async () => {
    vi.mocked(
      submitPasswordRecoveryReset
    ).mockResolvedValue(null);
    vi.mocked(
      readPasswordRecoveryUsername
    ).mockResolvedValue(ACCEPTED_USERNAME);
    render(await PasswordRecoveryResetPage());
    const page = createPasswordRecoveryResetFormViewPage();

    expect(page.getUsernameInput()).toHaveValue(
      ACCEPTED_USERNAME
    );
    await page.fillValid();
    await page.clickSubmit();

    await waitFor(() =>
      expect(submitPasswordRecoveryReset).toHaveBeenCalled()
    );
  });
});

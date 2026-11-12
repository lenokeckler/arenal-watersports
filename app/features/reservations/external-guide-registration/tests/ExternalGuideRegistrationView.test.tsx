import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ExternalGuideRegistrationView from "../ExternalGuideRegistrationView";
import { createExternalGuideRegistrationPage } from "./ExternalGuideRegistration.page";

describe("ExternalGuideRegistrationView", () => {
  it("shows only the external guide registration fields", () => {
    render(
      <ExternalGuideRegistrationView action={vi.fn()} />
    );
    const page = createExternalGuideRegistrationPage();

    expect(page.getHeading()).toBeVisible();
    expect(page.getFullNameField()).toBeVisible();
    expect(page.getNationalIdField()).toBeVisible();
    expect(page.getExpiryField()).toBeVisible();
    expect(page.getOptionalEmailField()).toBeVisible();
    expect(page.getSubmitButton()).toBeVisible();
  });
});

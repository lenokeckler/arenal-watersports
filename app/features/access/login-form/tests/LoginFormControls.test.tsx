import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import LoginFormSubmit from "../components/LoginFormSubmit";
import {
  FORM_SUBMIT_INTERACTIVE_CLASS,
  FORM_SUBMIT_PENDING_CLASS,
} from "@/app/components/form-submit-button/styles/FormSubmitButton.styles";
import { createLoginFormControlsPage } from "./LoginFormControls.page";
import {
  ARIA_DISABLED_ATTRIBUTE,
  ARIA_DISABLED_TRUE,
} from "./LoginFormControls.constants";

describe("LoginFormSubmit", () => {
  it("shows the login label and icon when idle", () => {
    render(<LoginFormSubmit isPending={false} />);
    const page = createLoginFormControlsPage();

    expect(page.getIdleSubmit()).not.toHaveAttribute(
      ARIA_DISABLED_ATTRIBUTE,
      ARIA_DISABLED_TRUE
    );
    expect(page.getLoginIcon()).toBeInTheDocument();
  });

  it("marks the button aria-disabled and spins the icon while pending", () => {
    render(<LoginFormSubmit isPending />);
    const page = createLoginFormControlsPage();

    expect(page.getPendingSubmit()).toHaveAttribute(
      ARIA_DISABLED_ATTRIBUTE,
      ARIA_DISABLED_TRUE
    );
    expect(page.getPendingSubmit()).toBeEnabled();
    expect(page.getProgressIcon()).toBeInTheDocument();
  });

  it("applies the hover and active classes only when idle", () => {
    const idle = render(
      <LoginFormSubmit isPending={false} />
    );
    const idleClasses =
      createLoginFormControlsPage().getIdleSubmit()
        .className;
    idle.unmount();
    render(<LoginFormSubmit isPending />);
    const pendingClasses =
      createLoginFormControlsPage().getPendingSubmit()
        .className;

    expect(idleClasses).toContain(
      FORM_SUBMIT_INTERACTIVE_CLASS
    );
    expect(pendingClasses.split(" ")).not.toContain(
      "hover:brightness-110"
    );
    expect(pendingClasses.split(" ")).not.toContain(
      "active:scale-98"
    );
    expect(pendingClasses).toContain(
      FORM_SUBMIT_PENDING_CLASS
    );
  });
});

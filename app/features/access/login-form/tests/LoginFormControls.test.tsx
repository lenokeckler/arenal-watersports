import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import LoginFormBanner from "../components/LoginFormBanner";
import LoginFormSubmit from "../components/LoginFormSubmit";
import {
  LOGIN_FORM_SUBMIT_INTERACTIVE_CLASS,
  LOGIN_FORM_SUBMIT_PENDING_CLASS,
} from "../styles/LoginForm.styles";
import { createLoginFormControlsPage } from "./LoginFormControls.page";
import {
  ARIA_DISABLED_ATTRIBUTE,
  ARIA_DISABLED_TRUE,
  BANNER_MESSAGE,
} from "./LoginFormControls.constants";

describe("LoginFormBanner", () => {
  it("renders nothing when there is no message", () => {
    render(<LoginFormBanner message={null} />);

    expect(
      createLoginFormControlsPage().queryBanner()
    ).not.toBeInTheDocument();
  });

  it("announces the message as an alert", () => {
    render(<LoginFormBanner message={BANNER_MESSAGE} />);

    expect(
      createLoginFormControlsPage().queryBanner()
    ).toHaveTextContent(BANNER_MESSAGE);
  });
});

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
      LOGIN_FORM_SUBMIT_INTERACTIVE_CLASS
    );
    expect(pendingClasses.split(" ")).not.toContain(
      "hover:brightness-110"
    );
    expect(pendingClasses.split(" ")).not.toContain(
      "active:scale-98"
    );
    expect(pendingClasses).toContain(
      LOGIN_FORM_SUBMIT_PENDING_CLASS
    );
  });
});

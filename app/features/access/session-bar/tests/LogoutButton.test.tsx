import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { resolveFormSubmitIconClassName } from "@/app/components/form-submit-button/styles/FormSubmitButton.styles";
import LogoutButton from "../components/LogoutButton";
import { LOGOUT_PHASE } from "../constants/LogoutPhase.constants";
import { resolveLogoutButtonClassName } from "../styles/LogoutButton.styles";
import {
  ALL_PHASES,
  ARIA_DISABLED_ATTRIBUTE,
  ARIA_DISABLED_FALSE,
  ARIA_DISABLED_TRUE,
  BUTTON_TYPE,
  DISABLED_ATTRIBUTE,
  EXPECTED_ICON,
  EXPECTED_LABEL,
  SPIN_CLASS,
  TYPE_ATTRIBUTE,
} from "./LogoutButton.constants";
import { createLogoutButtonPage } from "./LogoutButton.page";

describe("LogoutButton", () => {
  describe.each(ALL_PHASES)("in the %s phase", (phase) => {
    const label = EXPECTED_LABEL[phase];
    const isPending = phase === LOGOUT_PHASE.PENDING;

    it("is named by its visible label", () => {
      render(
        <LogoutButton
          phase={phase}
          onPress={vi.fn()}
        />
      );
      const page = createLogoutButtonPage();

      expect(page.getButton(label)).toBeInTheDocument();
    });

    it("is a plain button that never uses the disabled attribute", () => {
      render(
        <LogoutButton
          phase={phase}
          onPress={vi.fn()}
        />
      );
      const page = createLogoutButtonPage();

      expect(page.getButton(label)).toHaveAttribute(
        TYPE_ATTRIBUTE,
        BUTTON_TYPE
      );
      expect(page.getButton(label)).not.toHaveAttribute(
        DISABLED_ATTRIBUTE
      );
    });

    it("sets aria-disabled only while pending", () => {
      render(
        <LogoutButton
          phase={phase}
          onPress={vi.fn()}
        />
      );
      const page = createLogoutButtonPage();

      expect(page.getButton(label)).toHaveAttribute(
        ARIA_DISABLED_ATTRIBUTE,
        isPending ? ARIA_DISABLED_TRUE : ARIA_DISABLED_FALSE
      );
    });

    it("calls onPress once per tap", async () => {
      const onPress = vi.fn();
      render(
        <LogoutButton
          phase={phase}
          onPress={onPress}
        />
      );
      const page = createLogoutButtonPage();

      await page.press(label);

      expect(onPress).toHaveBeenCalledTimes(1);
    });

    it("shows the icon of its phase", () => {
      render(
        <LogoutButton
          phase={phase}
          onPress={vi.fn()}
        />
      );
      const page = createLogoutButtonPage();

      expect(
        page.getIcon(label, EXPECTED_ICON[phase])
      ).toBeInTheDocument();
    });

    it("spins the icon only while pending", () => {
      render(
        <LogoutButton
          phase={phase}
          onPress={vi.fn()}
        />
      );
      const page = createLogoutButtonPage();
      const icon = page.getIcon(
        label,
        EXPECTED_ICON[phase]
      );

      expect(icon.classList.contains(SPIN_CLASS)).toBe(
        isPending
      );
      resolveFormSubmitIconClassName(isPending)
        .split(" ")
        .forEach((iconClass) =>
          expect(icon).toHaveClass(iconClass)
        );
    });

    it("carries the class the resolver gives its phase", () => {
      render(
        <LogoutButton
          phase={phase}
          onPress={vi.fn()}
        />
      );
      const page = createLogoutButtonPage();

      resolveLogoutButtonClassName(phase)
        .split(" ")
        .forEach((buttonClass) =>
          expect(page.getButton(label)).toHaveClass(
            buttonClass
          )
        );
    });
  });
});

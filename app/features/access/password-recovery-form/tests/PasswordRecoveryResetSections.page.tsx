import { render, screen } from "@testing-library/react";
import { ARIA_ROLE } from "@/app/constants";
import PasswordRecoveryResetFields from "../components/PasswordRecoveryResetFields";
import PasswordRecoveryResetSubmit from "../components/PasswordRecoveryResetSubmit";
import { PASSWORD_RECOVERY_RESET_COPY } from "../constants/PasswordRecoveryResetCopy.constants";
import type { PasswordRecoveryResetFieldsProps } from "../models/PasswordRecoveryResetFieldsProps.interface";
import type { PasswordRecoveryResetSubmitProps } from "../models/PasswordRecoveryResetSubmitProps.interface";
import {
  INPUT_SELECTOR,
  NAME_ATTRIBUTE,
  ROLE_ATTRIBUTE,
  createResetFieldsProps,
  createResetSubmitProps,
} from "./passwordRecoveryResetSections.constants";

export const renderResetFields = (
  overrides: Partial<PasswordRecoveryResetFieldsProps> = {}
) => {
  render(
    <PasswordRecoveryResetFields
      {...createResetFieldsProps()}
      {...overrides}
    />
  );

  return {
    getFieldNames: (): Array<string | null> =>
      Array.from(
        document.querySelectorAll(INPUT_SELECTOR)
      ).map((input) => input.getAttribute(NAME_ATTRIBUTE)),
    getInput: (name: string): HTMLInputElement => {
      const input =
        document.querySelector<HTMLInputElement>(
          `${INPUT_SELECTOR}[${NAME_ATTRIBUTE}="${name}"]`
        );
      if (input === null) {
        throw new Error(`No input named ${name}`);
      }
      return input;
    },
  };
};

export const renderResetSubmit = (
  overrides: Partial<PasswordRecoveryResetSubmitProps> = {}
) => {
  const { container } = render(
    <PasswordRecoveryResetSubmit
      {...createResetSubmitProps()}
      {...overrides}
    />
  );

  return {
    getAlert: () => screen.queryByRole(ARIA_ROLE.ALERT),
    getButton: () =>
      screen.getByRole(ARIA_ROLE.BUTTON, {
        name: new RegExp(
          `${PASSWORD_RECOVERY_RESET_COPY.SUBMIT}|${PASSWORD_RECOVERY_RESET_COPY.SUBMITTING}`
        ),
      }),
    getChildOrder: (): Array<string | null> =>
      Array.from(container.children).map((child) =>
        child.getAttribute(ROLE_ATTRIBUTE)
      ),
  };
};

import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { vi } from "vitest";
import PersonalEmailField from "../components/PersonalEmailField";
import { PERSONAL_EMAIL_FORM_COPY } from "../constants/PersonalEmailFormCopy.constants";
import type { PersonalEmailFieldProps } from "../models/PersonalEmailFieldProps.interface";
import { REGISTERED_ADDRESS } from "./personalEmailScreen.constants";

const defaultProps = (): PersonalEmailFieldProps => ({
  error: null,
  inputRef: createRef(),
  isPending: false,
  onChange: vi.fn(),
  value: REGISTERED_ADDRESS,
});

export const renderPersonalEmailField = (
  overrides: Partial<PersonalEmailFieldProps> = {}
) => {
  render(
    <PersonalEmailField
      {...defaultProps()}
      {...overrides}
    />
  );

  return {
    getHint: () =>
      screen.getByText(PERSONAL_EMAIL_FORM_COPY.EMAIL_HINT),
    getInput: () =>
      screen.getByLabelText<HTMLInputElement>(
        PERSONAL_EMAIL_FORM_COPY.EMAIL_LABEL
      ),
  };
};

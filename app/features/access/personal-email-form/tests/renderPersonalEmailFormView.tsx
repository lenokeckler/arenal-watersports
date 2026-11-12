import { render } from "@testing-library/react";
import { vi } from "vitest";
import { PERSONAL_EMAIL_ERROR_COPY } from "../constants/PersonalEmailErrorCopy.constants";
import type { PersonalEmailFormViewProps } from "../models/PersonalEmailFormViewProps.interface";
import PersonalEmailFormView from "../PersonalEmailFormView";
import { REGISTERED_ADDRESS } from "./personalEmailScreen.constants";
import { createPersonalEmailFormViewPage } from "./PersonalEmailFormView.page";

export const renderPersonalEmailFormView = (
  overrides: Partial<PersonalEmailFormViewProps> = {}
) => {
  const props: PersonalEmailFormViewProps = {
    action: vi.fn(),
    canRemove: true,
    errorCopy: PERSONAL_EMAIL_ERROR_COPY,
    initialEmail: REGISTERED_ADDRESS,
    ...overrides,
  };
  render(<PersonalEmailFormView {...props} />);
  return createPersonalEmailFormViewPage();
};

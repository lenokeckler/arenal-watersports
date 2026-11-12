import { render } from "@testing-library/react";
import { vi } from "vitest";
import type { PasswordRecoveryRequestFormViewProps } from "../models/PasswordRecoveryRequestFormViewProps.interface";
import PasswordRecoveryRequestFormView from "../PasswordRecoveryRequestFormView";
import { createPasswordRecoveryRequestFormViewPage } from "./PasswordRecoveryRequestFormView.page";

export const renderPasswordRecoveryRequestFormView = (
  overrides: Partial<PasswordRecoveryRequestFormViewProps> = {}
) => {
  const props: PasswordRecoveryRequestFormViewProps = {
    action: vi.fn(),
    ...overrides,
  };
  render(<PasswordRecoveryRequestFormView {...props} />);
  return createPasswordRecoveryRequestFormViewPage();
};

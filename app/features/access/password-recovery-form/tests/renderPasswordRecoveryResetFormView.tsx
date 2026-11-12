import { render } from "@testing-library/react";
import { vi } from "vitest";
import type { PasswordRecoveryResetFormViewProps } from "../models/PasswordRecoveryResetFormViewProps.interface";
import PasswordRecoveryResetFormView from "../PasswordRecoveryResetFormView";
import { PRESET_USERNAME } from "./passwordRecoveryView.constants";
import { createPasswordRecoveryResetFormViewPage } from "./PasswordRecoveryResetFormView.page";

export const renderPasswordRecoveryResetFormView = (
  overrides: Partial<PasswordRecoveryResetFormViewProps> = {}
) => {
  const props: PasswordRecoveryResetFormViewProps = {
    action: vi.fn(),
    initialUsername: PRESET_USERNAME,
    ...overrides,
  };
  render(<PasswordRecoveryResetFormView {...props} />);
  return createPasswordRecoveryResetFormViewPage();
};

import { render } from "@testing-library/react";
import { createRef } from "react";
import { vi } from "vitest";
import type { PasswordRecoveryFieldProps } from "../models/PasswordRecoveryFieldProps.interface";
import { TYPED_USERNAME } from "./passwordRecoveryScreen.constants";

const defaultProps = (): PasswordRecoveryFieldProps => ({
  error: null,
  inputRef: createRef(),
  isPending: false,
  onChange: vi.fn(),
  value: TYPED_USERNAME,
});

export const renderPasswordRecoveryField = (
  Field: React.ComponentType<PasswordRecoveryFieldProps>,
  overrides: Partial<PasswordRecoveryFieldProps> = {}
): ReturnType<typeof render> =>
  render(
    <Field
      {...defaultProps()}
      {...overrides}
    />
  );

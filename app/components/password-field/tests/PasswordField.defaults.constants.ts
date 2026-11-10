import { createRef } from "react";
import { vi } from "vitest";
import type { PasswordFieldProps } from "../models/PasswordFieldProps.interface";
import {
  FIELD_AUTOCOMPLETE,
  FIELD_LABEL,
  FIELD_NAME,
  FIELD_PLACEHOLDER,
  FIELD_VALUE,
} from "./PasswordField.constants";

export const DEFAULT_PASSWORD_FIELD_PROPS: PasswordFieldProps =
  {
    autoComplete: FIELD_AUTOCOMPLETE,
    error: null,
    inputRef: createRef(),
    isPending: false,
    label: FIELD_LABEL,
    name: FIELD_NAME,
    onChange: vi.fn(),
    placeholder: FIELD_PLACEHOLDER,
    value: FIELD_VALUE,
  };

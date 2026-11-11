import { createRef } from "react";
import { vi } from "vitest";
import {
  PASSWORD_RECOVERY_FIELD,
  STRING,
} from "@/app/constants";
import type { PasswordRecoveryResetFieldsProps } from "../models/PasswordRecoveryResetFieldsProps.interface";
import type { PasswordRecoveryResetSubmitProps } from "../models/PasswordRecoveryResetSubmitProps.interface";
import { TYPED_USERNAME } from "./passwordRecoveryScreen.constants";

export const RESET_FIELD_ORDER = [
  PASSWORD_RECOVERY_FIELD.USERNAME,
  PASSWORD_RECOVERY_FIELD.PIN,
];

export const FIELD_ERRORS = {
  [PASSWORD_RECOVERY_FIELD.USERNAME]: "Usuario invalido.",
  [PASSWORD_RECOVERY_FIELD.PIN]: "PIN invalido.",
};

export const FORM_ERROR_MESSAGE = "Sin conexion.";
export const ARIA_DISABLED_ATTRIBUTE = "aria-disabled";
export const TRUE_VALUE = "true";
export const ROLE_ATTRIBUTE = "role";
export const NAME_ATTRIBUTE = "name";
export const INPUT_SELECTOR = "input";

export const createResetFieldsProps =
  (): PasswordRecoveryResetFieldsProps => ({
    fieldErrors: {
      [PASSWORD_RECOVERY_FIELD.CONFIRM_PASSWORD]: null,
      [PASSWORD_RECOVERY_FIELD.FORM]: null,
      [PASSWORD_RECOVERY_FIELD.NEW_PASSWORD]: null,
      [PASSWORD_RECOVERY_FIELD.PIN]: null,
      [PASSWORD_RECOVERY_FIELD.USERNAME]: null,
    },
    fieldRefs: {
      [PASSWORD_RECOVERY_FIELD.PIN]: createRef(),
      [PASSWORD_RECOVERY_FIELD.USERNAME]: createRef(),
    },
    isPending: false,
    onChange: vi.fn(),
    values: {
      pin: STRING.Empty,
      username: TYPED_USERNAME,
    },
  });

export const createResetSubmitProps =
  (): PasswordRecoveryResetSubmitProps => ({
    error: null,
    isPending: false,
  });

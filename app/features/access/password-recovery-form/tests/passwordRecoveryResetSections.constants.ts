import { createRef } from "react";
import { vi } from "vitest";
import {
  PASSWORD_RECOVERY_FIELD,
  PASSWORD_RULE,
  STRING,
} from "@/app/constants";
import type { PasswordRuleResults } from "@/app/utils/password/models/PasswordRuleResults.type";
import type { PasswordRecoveryResetFieldsProps } from "../models/PasswordRecoveryResetFieldsProps.interface";
import type { PasswordRecoveryResetSubmitProps } from "../models/PasswordRecoveryResetSubmitProps.interface";
import { TYPED_USERNAME } from "./passwordRecoveryScreen.constants";

export const RESET_FIELD_ORDER = [
  PASSWORD_RECOVERY_FIELD.USERNAME,
  PASSWORD_RECOVERY_FIELD.PIN,
  PASSWORD_RECOVERY_FIELD.NEW_PASSWORD,
  PASSWORD_RECOVERY_FIELD.CONFIRM_PASSWORD,
];

export const PASSWORD_FIELDS = [
  PASSWORD_RECOVERY_FIELD.NEW_PASSWORD,
  PASSWORD_RECOVERY_FIELD.CONFIRM_PASSWORD,
];

export const FIELD_ERRORS = {
  [PASSWORD_RECOVERY_FIELD.USERNAME]: "Usuario invalido.",
  [PASSWORD_RECOVERY_FIELD.PIN]: "PIN invalido.",
  [PASSWORD_RECOVERY_FIELD.NEW_PASSWORD]: "Clave debil.",
  [PASSWORD_RECOVERY_FIELD.CONFIRM_PASSWORD]:
    "No coincide.",
};

export const UNMET_RULES: PasswordRuleResults = {
  [PASSWORD_RULE.LENGTH]: false,
  [PASSWORD_RULE.UPPERCASE]: false,
  [PASSWORD_RULE.LOWERCASE]: false,
  [PASSWORD_RULE.DIGIT]: false,
  [PASSWORD_RULE.SYMBOL]: false,
};

export const RULE_COUNT = Object.keys(PASSWORD_RULE).length;
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
      [PASSWORD_RECOVERY_FIELD.CONFIRM_PASSWORD]:
        createRef(),
      [PASSWORD_RECOVERY_FIELD.NEW_PASSWORD]: createRef(),
      [PASSWORD_RECOVERY_FIELD.PIN]: createRef(),
      [PASSWORD_RECOVERY_FIELD.USERNAME]: createRef(),
    },
    isPending: false,
    onChange: vi.fn(),
    passwordRules: UNMET_RULES,
    showFailures: false,
    values: {
      confirmPassword: STRING.Empty,
      newPassword: STRING.Empty,
      pin: STRING.Empty,
      username: TYPED_USERNAME,
    },
  });

export const createResetSubmitProps =
  (): PasswordRecoveryResetSubmitProps => ({
    error: null,
    isPending: false,
  });

import { createRef } from "react";
import { vi } from "vitest";
import { PASSWORD_RULE } from "@/app/constants";
import { PASSWORD_CHANGE_FIELD } from "@/app/constants/access/PasswordChangeError.constants";
import type { PasswordRuleResults } from "@/app/utils/password/models/PasswordRuleResults.type";
import type { NewPasswordGroupProps } from "../models/NewPasswordGroupProps.interface";

export const FIELD_LABEL = "Contrasena nueva";
export const FIELD_PLACEHOLDER = "Escriba la nueva";
export const FIELD_VALUE = "secreto";
export const FIELD_NAME =
  PASSWORD_CHANGE_FIELD.NEW_PASSWORD;
export const ARIA_DESCRIBEDBY_ATTRIBUTE =
  "aria-describedby";
export const AUTOCOMPLETE_ATTRIBUTE = "autocomplete";
export const ID_ATTRIBUTE = "id";
export const RULE_COUNT = Object.keys(PASSWORD_RULE).length;

export const PENDING_RESULTS: PasswordRuleResults = {
  [PASSWORD_RULE.LENGTH]: false,
  [PASSWORD_RULE.UPPERCASE]: false,
  [PASSWORD_RULE.LOWERCASE]: false,
  [PASSWORD_RULE.DIGIT]: false,
  [PASSWORD_RULE.SYMBOL]: false,
};

export const DEFAULT_NEW_PASSWORD_GROUP_PROPS: NewPasswordGroupProps =
  {
    error: null,
    inputRef: createRef(),
    isPending: false,
    label: FIELD_LABEL,
    onChange: vi.fn(),
    passwordRules: PENDING_RESULTS,
    placeholder: FIELD_PLACEHOLDER,
    showFailures: false,
    value: FIELD_VALUE,
  };

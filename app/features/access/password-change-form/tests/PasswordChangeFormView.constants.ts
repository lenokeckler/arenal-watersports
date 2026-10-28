import { FIELD_ERROR_ID_SUFFIX } from "@/app/components/field-factory/constants/FieldFactory.constants";
import { PASSWORD_RULE } from "@/app/constants";
import { PASSWORD_CHANGE_FIELD } from "@/app/constants/access/PasswordChangeError.constants";
import { PASSWORD_CHANGE_NEW_PASSWORD_DESCRIBED_BY } from "../constants/PasswordChangeRules.constants";

export const RULE_COUNT = Object.keys(PASSWORD_RULE).length;
export const CURRENT_PASSWORD_ERROR_ID = `${PASSWORD_CHANGE_FIELD.CURRENT_PASSWORD}${FIELD_ERROR_ID_SUFFIX}`;
export const CONFIRM_PASSWORD_ERROR_ID = `${PASSWORD_CHANGE_FIELD.CONFIRM_PASSWORD}${FIELD_ERROR_ID_SUFFIX}`;
export const NEW_PASSWORD_ERROR_ID = `${PASSWORD_CHANGE_FIELD.NEW_PASSWORD}${FIELD_ERROR_ID_SUFFIX}`;
export const NEW_PASSWORD_DESCRIPTION_WITH_ERROR = `${NEW_PASSWORD_ERROR_ID} ${PASSWORD_CHANGE_NEW_PASSWORD_DESCRIBED_BY}`;
export const ARIA_DESCRIBEDBY_ATTRIBUTE =
  "aria-describedby";
export const ARIA_INVALID_ATTRIBUTE = "aria-invalid";
export const ARIA_INVALID_VALUE = "true";
export const AUTOCOMPLETE_ATTRIBUTE = "autocomplete";
export const READONLY_ATTRIBUTE = "readonly";
export const ENTER_KEY = "{Enter}";

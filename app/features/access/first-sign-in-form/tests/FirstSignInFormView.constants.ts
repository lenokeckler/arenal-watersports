import { FIELD_ERROR_ID_SUFFIX } from "@/app/components/field-factory/constants/FieldFactory.constants";
import { PASSWORD_RULE } from "@/app/constants";
import { FIRST_SIGN_IN_FIELD } from "@/app/constants/access/FirstSignInError.constants";
import { FIRST_SIGN_IN_NEW_PASSWORD_DESCRIBED_BY } from "../constants/FirstSignInRules.constants";

export const RULE_COUNT = Object.keys(PASSWORD_RULE).length;
export const CURRENT_PASSWORD_ERROR_ID = `${FIRST_SIGN_IN_FIELD.CURRENT_PASSWORD}${FIELD_ERROR_ID_SUFFIX}`;
export const CONFIRM_PASSWORD_ERROR_ID = `${FIRST_SIGN_IN_FIELD.CONFIRM_PASSWORD}${FIELD_ERROR_ID_SUFFIX}`;
export const NEW_PASSWORD_ERROR_ID = `${FIRST_SIGN_IN_FIELD.NEW_PASSWORD}${FIELD_ERROR_ID_SUFFIX}`;
export const NEW_PASSWORD_DESCRIPTION_WITH_ERROR = `${NEW_PASSWORD_ERROR_ID} ${FIRST_SIGN_IN_NEW_PASSWORD_DESCRIBED_BY}`;
export const ARIA_DESCRIBEDBY_ATTRIBUTE =
  "aria-describedby";
export const ARIA_INVALID_ATTRIBUTE = "aria-invalid";
export const ARIA_INVALID_VALUE = "true";
export const AUTOCOMPLETE_ATTRIBUTE = "autocomplete";
export const READONLY_ATTRIBUTE = "readonly";
export const ENTER_KEY = "{Enter}";

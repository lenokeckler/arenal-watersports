import { PASSWORD_RECOVERY_FIELD } from "@/app/constants";
import { NO_PASSWORD_RECOVERY_FORM_ERRORS } from "../constants/PasswordRecoveryRequestDefaults.constants";
import type { PasswordRecoveryFormErrors } from "../models/PasswordRecoveryFormErrors.type";
import type { PasswordRecoveryResetFocusField } from "../models/PasswordRecoveryResetFocusField.type";
import { FIELD_ERROR_TEXT } from "./passwordRecoveryRequest.constants";

const errorsOn = (
  ...fields: readonly PasswordRecoveryResetFocusField[]
): PasswordRecoveryFormErrors =>
  fields.reduce(
    (errors, field) => ({
      ...errors,
      [field]: FIELD_ERROR_TEXT,
    }),
    NO_PASSWORD_RECOVERY_FORM_ERRORS
  );

export const FOCUS_ORDER_CASES: readonly [
  string,
  PasswordRecoveryFormErrors,
  PasswordRecoveryResetFocusField,
][] = [
  [
    "username before the PIN",
    errorsOn(
      PASSWORD_RECOVERY_FIELD.PIN,
      PASSWORD_RECOVERY_FIELD.USERNAME
    ),
    PASSWORD_RECOVERY_FIELD.USERNAME,
  ],
  [
    "the PIN alone",
    errorsOn(PASSWORD_RECOVERY_FIELD.PIN),
    PASSWORD_RECOVERY_FIELD.PIN,
  ],
];

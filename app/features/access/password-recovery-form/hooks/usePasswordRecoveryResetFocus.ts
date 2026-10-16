import { useEffect, useMemo, useRef } from "react";
import { PASSWORD_RECOVERY_FIELD } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { isNewFocusRequest } from "@/app/utils/form-focus/isNewFocusRequest";
import { NO_HANDLED_PASSWORD_RECOVERY_FOCUS_TRIGGER } from "../constants/PasswordRecoveryRequestFocus.constants";
import { PASSWORD_RECOVERY_RESET_FOCUS_ORDER } from "../constants/PasswordRecoveryResetFocus.constants";
import type { PasswordRecoveryFocusTrigger } from "../models/PasswordRecoveryFocusTrigger.interface";
import type { PasswordRecoveryFormErrors } from "../models/PasswordRecoveryFormErrors.type";
import type { PasswordRecoveryResetFieldRefs } from "../models/PasswordRecoveryResetFieldRefs.type";
import type { PasswordRecoveryResetFocusField } from "../models/PasswordRecoveryResetFocusField.type";

export const usePasswordRecoveryResetFocus = (
  fieldErrors: PasswordRecoveryFormErrors,
  {
    invalidSubmitCount,
    serverError,
  }: PasswordRecoveryFocusTrigger
): PasswordRecoveryResetFieldRefs => {
  const usernameRef =
    useRef<NullableRef<HTMLInputElement>>(null);
  const pinRef =
    useRef<NullableRef<HTMLInputElement>>(null);
  const newPasswordRef =
    useRef<NullableRef<HTMLInputElement>>(null);
  const confirmPasswordRef =
    useRef<NullableRef<HTMLInputElement>>(null);
  const fieldRefs = useMemo(
    () => ({
      [PASSWORD_RECOVERY_FIELD.USERNAME]: usernameRef,
      [PASSWORD_RECOVERY_FIELD.PIN]: pinRef,
      [PASSWORD_RECOVERY_FIELD.NEW_PASSWORD]:
        newPasswordRef,
      [PASSWORD_RECOVERY_FIELD.CONFIRM_PASSWORD]:
        confirmPasswordRef,
    }),
    []
  );
  const handledTrigger =
    useRef<PasswordRecoveryFocusTrigger>(
      NO_HANDLED_PASSWORD_RECOVERY_FOCUS_TRIGGER
    );

  const errorFieldToFocus: NullableRef<PasswordRecoveryResetFocusField> =
    PASSWORD_RECOVERY_RESET_FOCUS_ORDER.find((field) =>
      Boolean(fieldErrors[field])
    ) ?? null;

  useEffect(() => {
    const current = { invalidSubmitCount, serverError };
    const shouldFocus = isNewFocusRequest(
      handledTrigger.current,
      current
    );
    handledTrigger.current = current;
    if (shouldFocus && errorFieldToFocus) {
      fieldRefs[errorFieldToFocus].current?.focus();
    }
  }, [
    invalidSubmitCount,
    serverError,
    errorFieldToFocus,
    fieldRefs,
  ]);

  return fieldRefs;
};

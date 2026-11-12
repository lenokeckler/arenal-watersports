import { useEffect, useMemo, useRef } from "react";
import { PASSWORD_RECOVERY_FIELD } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { isNewFocusRequest } from "@/app/utils/form-focus/isNewFocusRequest";
import { PASSWORD_RECOVERY_NEW_PASSWORD_FOCUS_ORDER } from "../constants/PasswordRecoveryNewPasswordDefaults.constants";
import { NO_HANDLED_PASSWORD_RECOVERY_FOCUS_TRIGGER } from "../constants/PasswordRecoveryRequestFocus.constants";
import type { PasswordRecoveryFocusTrigger } from "../models/PasswordRecoveryFocusTrigger.interface";
import type { PasswordRecoveryFormErrors } from "../models/PasswordRecoveryFormErrors.type";
import type { PasswordRecoveryNewPasswordFieldRefs } from "../models/PasswordRecoveryNewPasswordFieldRefs.type";

export const usePasswordRecoveryNewPasswordFocus = (
  fieldErrors: PasswordRecoveryFormErrors,
  {
    invalidSubmitCount,
    serverError,
  }: PasswordRecoveryFocusTrigger
): PasswordRecoveryNewPasswordFieldRefs => {
  const newPasswordRef =
    useRef<NullableRef<HTMLInputElement>>(null);
  const confirmPasswordRef =
    useRef<NullableRef<HTMLInputElement>>(null);
  const fieldRefs = useMemo(
    () => ({
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

  const errorFieldToFocus =
    PASSWORD_RECOVERY_NEW_PASSWORD_FOCUS_ORDER.find(
      (field) => Boolean(fieldErrors[field])
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

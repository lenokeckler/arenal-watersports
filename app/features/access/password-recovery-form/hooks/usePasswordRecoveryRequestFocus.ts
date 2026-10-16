import { useEffect, useMemo, useRef } from "react";
import { PASSWORD_RECOVERY_FIELD } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import {
  NO_HANDLED_PASSWORD_RECOVERY_FOCUS_TRIGGER,
  PASSWORD_RECOVERY_REQUEST_FOCUS_ORDER,
} from "../constants/PasswordRecoveryRequestFocus.constants";
import type { PasswordRecoveryFocusTrigger } from "../models/PasswordRecoveryFocusTrigger.interface";
import type { PasswordRecoveryFormErrors } from "../models/PasswordRecoveryFormErrors.type";
import type { PasswordRecoveryRequestFieldRefs } from "../models/PasswordRecoveryRequestFieldRefs.type";
import type { PasswordRecoveryRequestFocusField } from "../models/PasswordRecoveryRequestFocusField.type";

const isNewFocusRequest = (
  handled: PasswordRecoveryFocusTrigger,
  current: PasswordRecoveryFocusTrigger
): boolean =>
  current.invalidSubmitCount !==
    handled.invalidSubmitCount ||
  (current.serverError !== null &&
    current.serverError !== handled.serverError);

export const usePasswordRecoveryRequestFocus = (
  fieldErrors: PasswordRecoveryFormErrors,
  {
    invalidSubmitCount,
    serverError,
  }: PasswordRecoveryFocusTrigger
): PasswordRecoveryRequestFieldRefs => {
  const usernameRef =
    useRef<NullableRef<HTMLInputElement>>(null);
  const fieldRefs = useMemo(
    () => ({
      [PASSWORD_RECOVERY_FIELD.USERNAME]: usernameRef,
    }),
    []
  );
  const handledTrigger =
    useRef<PasswordRecoveryFocusTrigger>(
      NO_HANDLED_PASSWORD_RECOVERY_FOCUS_TRIGGER
    );

  const errorFieldToFocus: NullableRef<PasswordRecoveryRequestFocusField> =
    PASSWORD_RECOVERY_REQUEST_FOCUS_ORDER.find((field) =>
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

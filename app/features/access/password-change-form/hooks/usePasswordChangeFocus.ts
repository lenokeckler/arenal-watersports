import { useEffect, useRef } from "react";
import type { NullableRef } from "@/app/types";
import {
  PASSWORD_CHANGE_FOCUS_ORDER,
  NO_HANDLED_FOCUS_TRIGGER,
} from "../constants/PasswordChangeFocus.constants";
import { usePasswordChangeFieldRefs } from "./usePasswordChangeFieldRefs";
import type { PasswordChangeFieldRefs } from "../models/PasswordChangeFieldRefs.type";
import type { PasswordChangeFocusField } from "../models/PasswordChangeFocusField.type";
import type { PasswordChangeFocusTrigger } from "../models/PasswordChangeFocusTrigger.interface";
import type { PasswordChangeFormErrors } from "../models/PasswordChangeFormErrors.type";

const isNewFocusRequest = (
  handled: PasswordChangeFocusTrigger,
  current: PasswordChangeFocusTrigger
): boolean =>
  current.invalidSubmitCount !==
    handled.invalidSubmitCount ||
  (current.serverError !== null &&
    current.serverError !== handled.serverError);

export const usePasswordChangeFocus = (
  fieldErrors: PasswordChangeFormErrors,
  {
    invalidSubmitCount,
    serverError,
  }: PasswordChangeFocusTrigger
): PasswordChangeFieldRefs => {
  const fieldRefs = usePasswordChangeFieldRefs();
  const handledTrigger = useRef<PasswordChangeFocusTrigger>(
    NO_HANDLED_FOCUS_TRIGGER
  );

  const errorFieldToFocus: NullableRef<PasswordChangeFocusField> =
    PASSWORD_CHANGE_FOCUS_ORDER.find((field) =>
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

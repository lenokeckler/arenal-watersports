import { useEffect, useMemo, useRef } from "react";
import { FIRST_SIGN_IN_FIELD } from "@/app/constants/access/FirstSignInError.constants";
import type { NullableRef } from "@/app/types";
import {
  FIRST_SIGN_IN_FOCUS_ORDER,
  NO_HANDLED_FOCUS_TRIGGER,
} from "../constants/FirstSignInFocus.constants";
import type { FirstSignInFieldRefs } from "../models/FirstSignInFieldRefs.type";
import type { FirstSignInFocusField } from "../models/FirstSignInFocusField.type";
import type { FirstSignInFocusTrigger } from "../models/FirstSignInFocusTrigger.interface";
import type { FirstSignInFormErrors } from "../models/FirstSignInFormErrors.type";

const isNewFocusRequest = (
  handled: FirstSignInFocusTrigger,
  current: FirstSignInFocusTrigger
): boolean =>
  current.invalidSubmitCount !==
    handled.invalidSubmitCount ||
  (current.serverError !== null &&
    current.serverError !== handled.serverError);

export const useFirstSignInFocus = (
  fieldErrors: FirstSignInFormErrors,
  {
    invalidSubmitCount,
    serverError,
  }: FirstSignInFocusTrigger
): FirstSignInFieldRefs => {
  const currentPasswordRef =
    useRef<NullableRef<HTMLInputElement>>(null);
  const newPasswordRef =
    useRef<NullableRef<HTMLInputElement>>(null);
  const confirmPasswordRef =
    useRef<NullableRef<HTMLInputElement>>(null);
  const fieldRefs: FirstSignInFieldRefs = useMemo(
    () => ({
      [FIRST_SIGN_IN_FIELD.CONFIRM_PASSWORD]:
        confirmPasswordRef,
      [FIRST_SIGN_IN_FIELD.CURRENT_PASSWORD]:
        currentPasswordRef,
      [FIRST_SIGN_IN_FIELD.NEW_PASSWORD]: newPasswordRef,
    }),
    []
  );
  const handledTrigger = useRef<FirstSignInFocusTrigger>(
    NO_HANDLED_FOCUS_TRIGGER
  );

  const errorFieldToFocus: NullableRef<FirstSignInFocusField> =
    FIRST_SIGN_IN_FOCUS_ORDER.find((field) =>
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

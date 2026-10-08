import { useEffect, useRef } from "react";
import type { NullableRef } from "@/app/types";
import {
  FIRST_SIGN_IN_FOCUS_ORDER,
  NO_HANDLED_FOCUS_TRIGGER,
} from "../constants/FirstSignInFocus.constants";
import { useFirstSignInFieldRefs } from "./useFirstSignInFieldRefs";
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
  const fieldRefs = useFirstSignInFieldRefs();
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

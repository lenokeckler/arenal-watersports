import { useEffect, useMemo, useRef } from "react";
import { PERSONAL_EMAIL_FIELD } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { isNewFocusRequest } from "@/app/utils/form-focus/isNewFocusRequest";
import {
  NO_HANDLED_PERSONAL_EMAIL_FOCUS_TRIGGER,
  PERSONAL_EMAIL_FOCUS_ORDER,
} from "../constants/PersonalEmailFocus.constants";
import type { PersonalEmailFieldRefs } from "../models/PersonalEmailFieldRefs.type";
import type { PersonalEmailFocusField } from "../models/PersonalEmailFocusField.type";
import type { PersonalEmailFocusTrigger } from "../models/PersonalEmailFocusTrigger.interface";
import type { PersonalEmailFormErrors } from "../models/PersonalEmailFormErrors.type";

export const usePersonalEmailFocus = (
  fieldErrors: PersonalEmailFormErrors,
  {
    invalidSubmitCount,
    serverError,
  }: PersonalEmailFocusTrigger
): PersonalEmailFieldRefs => {
  const emailRef =
    useRef<NullableRef<HTMLInputElement>>(null);
  const currentPasswordRef =
    useRef<NullableRef<HTMLInputElement>>(null);
  const fieldRefs = useMemo(
    () => ({
      [PERSONAL_EMAIL_FIELD.CURRENT_PASSWORD]:
        currentPasswordRef,
      [PERSONAL_EMAIL_FIELD.EMAIL]: emailRef,
    }),
    []
  );
  const handledTrigger = useRef<PersonalEmailFocusTrigger>(
    NO_HANDLED_PERSONAL_EMAIL_FOCUS_TRIGGER
  );

  const errorFieldToFocus: NullableRef<PersonalEmailFocusField> =
    PERSONAL_EMAIL_FOCUS_ORDER.find((field) =>
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

import { useEffect, useMemo, useRef } from "react";
import { SIGN_IN_FIELD } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { LOGIN_FOCUS_ORDER } from "../constants/LoginFormFocus.constants";
import type { LoginFocusField } from "../models/LoginFocusField.type";
import type { LoginFormFieldRefs } from "../models/LoginFormFieldRefs.type";
import type { SignInFieldErrors } from "../models/SignInFieldErrors.type";

export const useLoginFormFocus = (
  fieldErrors: SignInFieldErrors,
  submitAttempt: number
): LoginFormFieldRefs => {
  const usernameRef =
    useRef<NullableRef<HTMLInputElement>>(null);
  const passwordRef =
    useRef<NullableRef<HTMLInputElement>>(null);
  const fieldRefs: LoginFormFieldRefs = useMemo(
    () => ({
      [SIGN_IN_FIELD.PASSWORD]: passwordRef,
      [SIGN_IN_FIELD.USERNAME]: usernameRef,
    }),
    []
  );
  const handledAttempt = useRef(0);

  const errorFieldToFocus: NullableRef<LoginFocusField> =
    LOGIN_FOCUS_ORDER.find((field) =>
      Boolean(fieldErrors[field])
    ) ?? null;

  useEffect(() => {
    if (submitAttempt === handledAttempt.current) {
      return;
    }
    handledAttempt.current = submitAttempt;
    if (errorFieldToFocus) {
      fieldRefs[errorFieldToFocus].current?.focus();
    }
  }, [submitAttempt, errorFieldToFocus, fieldRefs]);

  return fieldRefs;
};

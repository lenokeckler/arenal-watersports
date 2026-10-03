import { useEffect, useRef } from "react";
import { SIGN_IN_FIELD } from "@/app/constants/access/SignInError.constants";
import type { NullableRef } from "@/app/types";
import { NO_SIGN_IN_FIELD_ERRORS } from "../constants/LoginFormDefaults.constants";
import type { LoginFormFieldRefs } from "../models/LoginFormFieldRefs.type";
import type { SignInFieldErrors } from "../models/SignInFieldErrors.type";
import { resolveFirstNewFieldError } from "../utils/resolveFirstNewFieldError";

export const useLoginFormFocus = (
  fieldErrors: SignInFieldErrors
): LoginFormFieldRefs => {
  const usernameRef =
    useRef<NullableRef<HTMLInputElement>>(null);
  const passwordRef =
    useRef<NullableRef<HTMLInputElement>>(null);
  const fieldRefs: LoginFormFieldRefs = {
    [SIGN_IN_FIELD.PASSWORD]: passwordRef,
    [SIGN_IN_FIELD.USERNAME]: usernameRef,
  };
  const previousErrors = useRef(NO_SIGN_IN_FIELD_ERRORS);

  useEffect(() => {
    const field = resolveFirstNewFieldError(
      previousErrors.current,
      fieldErrors
    );
    previousErrors.current = fieldErrors;
    if (field) {
      fieldRefs[field].current?.focus();
    }
  });

  return fieldRefs;
};

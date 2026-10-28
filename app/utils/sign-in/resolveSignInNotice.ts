import {
  SIGN_IN_NOTICE_ERROR_CODE,
  SIGN_IN_NOTICE_REASON,
} from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { createSignInError } from "./createSignInError";
import type { SearchParamValue } from "./models/SearchParamValue.type";
import type { SignInError } from "./models/SignInError.interface";

export const resolveSignInNotice = (
  rawReason: SearchParamValue
): NullableRef<SignInError> => {
  const reason = Object.values(SIGN_IN_NOTICE_REASON).find(
    (knownReason) => knownReason === rawReason
  );

  return reason
    ? createSignInError(SIGN_IN_NOTICE_ERROR_CODE[reason])
    : null;
};

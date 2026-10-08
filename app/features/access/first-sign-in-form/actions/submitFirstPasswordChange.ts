"use server";

import { redirect } from "next/navigation";
import {
  FIRST_SIGN_IN_ERROR_CODE,
  PATHS,
} from "@/app/constants";
import {
  changeFirstPassword,
  type FirstPasswordChangeResult,
} from "@/app/services/authentication";
import type { NullableRef } from "@/app/types";
import { createFirstSignInError } from "@/app/utils/first-sign-in/createFirstSignInError";
import type { FirstPasswordChangeInput } from "@/app/utils/first-sign-in/models/FirstPasswordChangeInput.interface";
import type { FirstSignInError } from "@/app/utils/first-sign-in/models/FirstSignInError.interface";
import { readFirstPasswordChangeInput } from "../utils/readFirstPasswordChangeInput";

const runPasswordChange = async (
  input: FirstPasswordChangeInput
): Promise<FirstPasswordChangeResult> => {
  try {
    return await changeFirstPassword(input);
  } catch {
    return {
      ok: false,
      error: createFirstSignInError(
        FIRST_SIGN_IN_ERROR_CODE.UNKNOWN
      ),
    };
  }
};

export const submitFirstPasswordChange = async (
  _previousError: NullableRef<FirstSignInError>,
  formData: FormData
): Promise<NullableRef<FirstSignInError>> => {
  const result = await runPasswordChange(
    readFirstPasswordChangeInput(formData)
  );

  if (result.ok) {
    redirect(PATHS.HOME);
  }

  return result.error;
};

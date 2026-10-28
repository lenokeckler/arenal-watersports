"use server";

import { redirect } from "next/navigation";
import {
  PASSWORD_CHANGE_ERROR_CODE,
  PATHS,
} from "@/app/constants";
import {
  changeFirstPassword,
  type PasswordChangeResult,
} from "@/app/services/authentication";
import type { NullableRef } from "@/app/types";
import { createPasswordChangeError } from "@/app/utils/password-change/createPasswordChangeError";
import type { PasswordChangeInput } from "@/app/utils/password-change/models/PasswordChangeInput.interface";
import type { PasswordChangeError } from "@/app/utils/password-change/models/PasswordChangeError.interface";
import { readPasswordChangeInput } from "../utils/readPasswordChangeInput";

const runPasswordChange = async (
  input: PasswordChangeInput
): Promise<PasswordChangeResult> => {
  try {
    return await changeFirstPassword(input);
  } catch {
    return {
      ok: false,
      error: createPasswordChangeError(
        PASSWORD_CHANGE_ERROR_CODE.UNKNOWN
      ),
    };
  }
};

export const submitFirstPasswordChange = async (
  _previousError: NullableRef<PasswordChangeError>,
  formData: FormData
): Promise<NullableRef<PasswordChangeError>> => {
  const result = await runPasswordChange(
    readPasswordChangeInput(formData)
  );

  if (result.ok) {
    redirect(PATHS.HOME);
  }

  return result.error;
};

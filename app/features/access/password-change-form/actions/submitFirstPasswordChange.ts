"use server";

import { redirect } from "next/navigation";
import { PATHS } from "@/app/constants";
import { changeFirstPassword } from "@/app/services/authentication";
import type { NullableRef } from "@/app/types";
import type { PasswordChangeError } from "@/app/utils/password-change/models/PasswordChangeError.interface";
import { readPasswordChangeInput } from "../utils/readPasswordChangeInput";
import { runPasswordChange } from "../utils/runPasswordChange";

export const submitFirstPasswordChange = async (
  _previousError: NullableRef<PasswordChangeError>,
  formData: FormData
): Promise<NullableRef<PasswordChangeError>> => {
  const result = await runPasswordChange(
    changeFirstPassword,
    readPasswordChangeInput(formData)
  );

  if (result.ok) {
    redirect(PATHS.HOME);
  }

  return result.error;
};

import type { PasswordChangeError } from "@/app/utils/password-change/models/PasswordChangeError.interface";
import { createPersonalEmailError } from "./createPersonalEmailError";
import type { PersonalEmailError } from "./models/PersonalEmailError.interface";
import { resolvePersonalEmailErrorCode } from "./resolvePersonalEmailErrorCode";

export const mapReauthenticationError = (
  error: PasswordChangeError
): PersonalEmailError =>
  createPersonalEmailError(
    resolvePersonalEmailErrorCode(error.code)
  );

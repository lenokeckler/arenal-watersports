import type { PasswordChangeError } from "@/app/utils/password-change/models/PasswordChangeError.interface";
import { isBlockedReauthenticationErrorCode } from "./isBlockedReauthenticationErrorCode";

export const isBlockedReauthenticationError = ({
  code,
}: PasswordChangeError): boolean =>
  isBlockedReauthenticationErrorCode(code);

import type { PasswordChangeError } from "./models/PasswordChangeError.interface";
import { isBlockedPasswordChangeErrorCode } from "./isBlockedPasswordChangeErrorCode";

export const isBlockedPasswordChangeError = ({
  code,
}: PasswordChangeError): boolean =>
  isBlockedPasswordChangeErrorCode(code);

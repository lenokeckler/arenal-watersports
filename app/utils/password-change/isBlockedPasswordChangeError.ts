import { BLOCKED_PASSWORD_CHANGE_ERROR_CODES } from "@/app/constants";
import type { PasswordChangeError } from "./models/PasswordChangeError.interface";

export const isBlockedPasswordChangeError = ({
  code,
}: PasswordChangeError): boolean =>
  BLOCKED_PASSWORD_CHANGE_ERROR_CODES.includes(code);

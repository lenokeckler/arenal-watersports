import type { PasswordChangeErrorCode } from "@/app/constants/access/PasswordChangeError.constants";

export type PasswordChangeErrorCopy = Record<
  PasswordChangeErrorCode,
  string
>;

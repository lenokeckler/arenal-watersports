import type { PasswordRecoveryErrorCode } from "@/app/constants";

export type PasswordRecoveryErrorCopy = Record<
  PasswordRecoveryErrorCode,
  string
>;

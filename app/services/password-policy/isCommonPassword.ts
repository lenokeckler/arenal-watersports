import commonPasswords from "./data/commonPasswords.json";

const COMMON_PASSWORDS: ReadonlySet<string> = new Set(
  commonPasswords
);

export const isCommonPassword = (
  password: string
): boolean => COMMON_PASSWORDS.has(password.toLowerCase());

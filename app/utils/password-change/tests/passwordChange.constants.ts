import { PASSWORD_LENGTH } from "@/app/constants";
import type { PasswordChangeInput } from "../models/PasswordChangeInput.interface";

const COMPLIANT_PREFIX = "Aa1!";
const FILLER_CHARACTER = "a";
const TWO_BYTE_CHARACTER = "á";

export const DEFAULT_PASSWORD_CHANGE_INPUT: PasswordChangeInput =
  {
    confirmPassword: "Nueva-clave-1!",
    currentPassword: "Temporal-1!",
    newPassword: "Nueva-clave-1!",
  };

export const WEAK_PASSWORD = "nueva";
export const MISMATCHED_CONFIRMATION = "Otra-clave-2!";

export const COMPLIANT_PASSWORD_AT_MAX =
  COMPLIANT_PREFIX +
  FILLER_CHARACTER.repeat(
    PASSWORD_LENGTH.MAX - COMPLIANT_PREFIX.length
  );
export const PASSWORD_ONE_ABOVE_MAX =
  COMPLIANT_PASSWORD_AT_MAX + FILLER_CHARACTER;

const TEMPORARY_PASSWORD =
  DEFAULT_PASSWORD_CHANGE_INPUT.currentPassword;
const NEW_PASSWORD =
  DEFAULT_PASSWORD_CHANGE_INPUT.newPassword;

export const TEMPORARY_PASSWORD_IN_OTHER_CASE =
  TEMPORARY_PASSWORD.toUpperCase();
export const NEW_PASSWORD_WITH_TRAILING_SPACE = `${NEW_PASSWORD} `;
export const NEW_PASSWORD_IN_OTHER_CASE =
  NEW_PASSWORD.toUpperCase();
export const WHITESPACE_ONLY_PASSWORD = "   ";
export const WEAK_PASSWORD_ABOVE_MAX = "a".repeat(
  PASSWORD_LENGTH.MAX + 1
);
export const ACCENTED_PASSWORD_AT_MAX =
  COMPLIANT_PREFIX +
  TWO_BYTE_CHARACTER.repeat(
    PASSWORD_LENGTH.MAX - COMPLIANT_PREFIX.length
  );

export const COMPOSED_ACCENTED_PASSWORD = "Contraseña-é1!";
export const DECOMPOSED_ACCENTED_PASSWORD =
  COMPOSED_ACCENTED_PASSWORD.normalize("NFD");
export const VERY_LONG_PASSWORD_LENGTH = 100_000;
export const VERY_LONG_PASSWORD = "a".repeat(
  VERY_LONG_PASSWORD_LENGTH
);
export const VERY_LONG_PASSWORD_WITH_LAST_CHARACTER_CHANGED = `${VERY_LONG_PASSWORD.slice(0, -1)}b`;

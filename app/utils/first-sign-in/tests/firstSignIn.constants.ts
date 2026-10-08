import { PASSWORD_LENGTH } from "@/app/constants";
import type { FirstPasswordChangeInput } from "../models/FirstPasswordChangeInput.interface";

const COMPLIANT_PREFIX = "Aa1!";
const FILLER_CHARACTER = "a";

export const DEFAULT_FIRST_PASSWORD_CHANGE_INPUT: FirstPasswordChangeInput =
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

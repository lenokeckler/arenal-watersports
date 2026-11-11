import { PASSWORD_RECOVERY_GRANT } from "@/app/constants";
import {
  RESET_NEW_PASSWORD,
  RESET_UNNORMALIZED_PIN,
} from "./passwordRecoveryReset.constants";

export const GRANT =
  "4f9c2a7e1b3d5f6081a2c3e4d5f60718293a4b5c6d7e8f90a1b2c3d4e5f60718";
export const MALFORMED_GRANT = "not-a-grant";
export const GRANT_USERNAME = "  Worker.One ";
export const GRANT_COMMON_PASSWORD = "Password1!";

export const PIN_INPUT = {
  pin: RESET_UNNORMALIZED_PIN,
  username: GRANT_USERNAME,
};

export const GRANT_RESET_INPUT = {
  confirmPassword: RESET_NEW_PASSWORD,
  grant: GRANT,
  newPassword: RESET_NEW_PASSWORD,
};

export const GRANT_COOKIE = {
  NAME: PASSWORD_RECOVERY_GRANT.COOKIE_NAME,
  VALUE: GRANT,
} as const;

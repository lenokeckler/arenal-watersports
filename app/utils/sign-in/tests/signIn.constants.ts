import {
  PASSWORD_LENGTH,
  STRING,
  USERNAME,
} from "@/app/constants";
import type { SignInCredentials } from "../models/SignInCredentials.interface";

const FILLER_CHARACTER = "a";

export const DEFAULT_SIGN_IN_CREDENTIALS: SignInCredentials =
  {
    password: "Local-test-password1!",
    username: "admin",
  };

export const UNNORMALIZED_USERNAME = "  Admin ";
export const NORMALIZED_AUTH_EMAIL = "admin@arenal.local";

export const USERNAME_ONE_BELOW_MIN =
  FILLER_CHARACTER.repeat(USERNAME.LENGTH.MIN - 1);
export const USERNAME_AT_MIN = FILLER_CHARACTER.repeat(
  USERNAME.LENGTH.MIN
);
export const USERNAME_AT_MAX = FILLER_CHARACTER.repeat(
  USERNAME.LENGTH.MAX
);
export const USERNAME_ONE_ABOVE_MAX =
  FILLER_CHARACTER.repeat(USERNAME.LENGTH.MAX + 1);
export const BLANK_USERNAME = STRING.SPACE.repeat(
  USERNAME.LENGTH.MIN
);

export const PASSWORD_AT_MAX = FILLER_CHARACTER.repeat(
  PASSWORD_LENGTH.MAX
);
export const PASSWORD_ONE_ABOVE_MAX =
  FILLER_CHARACTER.repeat(PASSWORD_LENGTH.MAX + 1);

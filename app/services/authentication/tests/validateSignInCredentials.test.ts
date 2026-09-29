import { describe, expect, it } from "vitest";
import {
  SIGN_IN_ERROR_CODE,
  STRING,
  type SignInErrorCode,
} from "@/app/constants";
import type { SignInCredentials } from "../models/SignInCredentials.interface";
import { validateSignInCredentials } from "../validateSignInCredentials";
import {
  BLANK_USERNAME,
  DEFAULT_SIGN_IN_CREDENTIALS,
  PASSWORD_AT_MAX,
  PASSWORD_MULTIBYTE_ABOVE_MAX_BYTES,
  PASSWORD_ONE_ABOVE_MAX,
  UNNORMALIZED_USERNAME,
  USERNAME_AT_MAX,
  USERNAME_AT_MIN,
  USERNAME_ONE_ABOVE_MAX,
  USERNAME_ONE_BELOW_MIN,
} from "./signIn.constants";

const failureCases: [
  string,
  Partial<SignInCredentials>,
  SignInErrorCode,
][] = [
  [
    "an empty username",
    { username: STRING.Empty },
    SIGN_IN_ERROR_CODE.USERNAME_REQUIRED,
  ],
  [
    "a blank username",
    { username: BLANK_USERNAME },
    SIGN_IN_ERROR_CODE.USERNAME_REQUIRED,
  ],
  [
    "a username one below the minimum",
    { username: USERNAME_ONE_BELOW_MIN },
    SIGN_IN_ERROR_CODE.USERNAME_LENGTH,
  ],
  [
    "a username one above the maximum",
    { username: USERNAME_ONE_ABOVE_MAX },
    SIGN_IN_ERROR_CODE.USERNAME_LENGTH,
  ],
  [
    "an empty password",
    { password: STRING.Empty },
    SIGN_IN_ERROR_CODE.PASSWORD_REQUIRED,
  ],
  [
    "a password one above the maximum",
    { password: PASSWORD_ONE_ABOVE_MAX },
    SIGN_IN_ERROR_CODE.PASSWORD_TOO_LONG,
  ],
  [
    "a password within the character maximum but above it in bytes",
    { password: PASSWORD_MULTIBYTE_ABOVE_MAX_BYTES },
    SIGN_IN_ERROR_CODE.PASSWORD_TOO_LONG,
  ],
];

const acceptedCases: [
  string,
  Partial<SignInCredentials>,
][] = [
  ["valid credentials", {}],
  [
    "a padded and uppercase username",
    { username: UNNORMALIZED_USERNAME },
  ],
  [
    "a username at the minimum",
    { username: USERNAME_AT_MIN },
  ],
  [
    "a username at the maximum",
    { username: USERNAME_AT_MAX },
  ],
  [
    "a password at the maximum",
    { password: PASSWORD_AT_MAX },
  ],
];

describe("validateSignInCredentials", () => {
  it.each(failureCases)(
    "rejects %s",
    (_description, overrides, code) => {
      const credentials = {
        ...DEFAULT_SIGN_IN_CREDENTIALS,
        ...overrides,
      };

      expect(
        validateSignInCredentials(credentials)?.code
      ).toBe(code);
    }
  );

  it.each(acceptedCases)(
    "accepts %s",
    (_description, overrides) => {
      const credentials = {
        ...DEFAULT_SIGN_IN_CREDENTIALS,
        ...overrides,
      };

      expect(
        validateSignInCredentials(credentials)
      ).toBeNull();
    }
  );
});

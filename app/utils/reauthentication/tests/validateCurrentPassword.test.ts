import { describe, expect, it } from "vitest";
import {
  REAUTHENTICATION_ERROR_CODE,
  STRING,
} from "@/app/constants";
import { validateCurrentPassword } from "../validateCurrentPassword";
import {
  CURRENT_PASSWORD_AT_MAX_BYTES,
  CURRENT_PASSWORD_AT_MAX_LENGTH,
  CURRENT_PASSWORD_ONE_BYTE_ABOVE_MAX,
} from "@/app/utils/password-change/tests/currentPasswordLimits.constants";
import {
  CURRENT_PASSWORD_ONE_CHARACTER_ABOVE_MAX,
  VALID_CURRENT_PASSWORD,
} from "./currentPassword.constants";

describe("validateCurrentPassword", () => {
  it.each([
    VALID_CURRENT_PASSWORD,
    CURRENT_PASSWORD_AT_MAX_LENGTH,
    CURRENT_PASSWORD_AT_MAX_BYTES,
  ])("accepts a password within the limits", (password) => {
    expect(validateCurrentPassword(password)).toBeNull();
  });

  it("requires a value", () => {
    expect(validateCurrentPassword(STRING.Empty)).toBe(
      REAUTHENTICATION_ERROR_CODE.CURRENT_PASSWORD_REQUIRED
    );
  });

  it.each([
    CURRENT_PASSWORD_ONE_CHARACTER_ABOVE_MAX,
    CURRENT_PASSWORD_ONE_BYTE_ABOVE_MAX,
  ])("rejects a password above the limits", (password) => {
    expect(validateCurrentPassword(password)).toBe(
      REAUTHENTICATION_ERROR_CODE.CURRENT_PASSWORD_TOO_LONG
    );
  });
});

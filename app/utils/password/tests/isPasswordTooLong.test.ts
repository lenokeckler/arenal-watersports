import { describe, expect, it } from "vitest";
import { PASSWORD_LENGTH } from "@/app/constants";
import { isPasswordTooLong } from "../isPasswordTooLong";
import {
  buildPasswordOfLength,
  MAX_LENGTH_PASSWORD_AT_BYTE_LIMIT,
  MAX_LENGTH_PASSWORD_ONE_BYTE_ABOVE_LIMIT,
} from "./password.constants";

describe("isPasswordTooLong", () => {
  it("accepts a password at the character limit", () => {
    expect(
      isPasswordTooLong(
        buildPasswordOfLength(PASSWORD_LENGTH.MAX)
      )
    ).toBe(false);
  });

  it("rejects a password one character above the limit", () => {
    expect(
      isPasswordTooLong(
        buildPasswordOfLength(PASSWORD_LENGTH.MAX + 1)
      )
    ).toBe(true);
  });

  it("accepts a password at the byte limit", () => {
    expect(
      isPasswordTooLong(MAX_LENGTH_PASSWORD_AT_BYTE_LIMIT)
    ).toBe(false);
  });

  it("rejects a password one byte above the limit", () => {
    expect(
      isPasswordTooLong(
        MAX_LENGTH_PASSWORD_ONE_BYTE_ABOVE_LIMIT
      )
    ).toBe(true);
  });
});

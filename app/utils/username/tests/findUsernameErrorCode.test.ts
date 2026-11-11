import { describe, expect, it } from "vitest";
import { SIGN_IN_ERROR_CODE } from "@/app/constants";
import { findUsernameErrorCode } from "../findUsernameErrorCode";
import {
  BLANK_USERNAME,
  EMPTY_USERNAME,
  PADDED_UPPERCASE_USERNAME,
  USERNAME_AT_MAX,
  USERNAME_AT_MIN,
  USERNAME_ONE_ABOVE_MAX,
  USERNAME_ONE_BELOW_MIN,
} from "./findUsernameErrorCode.constants";

describe("findUsernameErrorCode", () => {
  it("requires a username when it is empty", () => {
    expect(findUsernameErrorCode(EMPTY_USERNAME)).toBe(
      SIGN_IN_ERROR_CODE.USERNAME_REQUIRED
    );
  });

  it("requires a username when it is only whitespace", () => {
    expect(findUsernameErrorCode(BLANK_USERNAME)).toBe(
      SIGN_IN_ERROR_CODE.USERNAME_REQUIRED
    );
  });

  it("rejects a username one character below the minimum", () => {
    expect(
      findUsernameErrorCode(USERNAME_ONE_BELOW_MIN)
    ).toBe(SIGN_IN_ERROR_CODE.USERNAME_LENGTH);
  });

  it("rejects a username one character above the maximum", () => {
    expect(
      findUsernameErrorCode(USERNAME_ONE_ABOVE_MAX)
    ).toBe(SIGN_IN_ERROR_CODE.USERNAME_LENGTH);
  });

  it("accepts a username at the minimum length", () => {
    expect(
      findUsernameErrorCode(USERNAME_AT_MIN)
    ).toBeNull();
  });

  it("accepts a username at the maximum length", () => {
    expect(
      findUsernameErrorCode(USERNAME_AT_MAX)
    ).toBeNull();
  });

  it("accepts a padded uppercase username within the limits", () => {
    expect(
      findUsernameErrorCode(PADDED_UPPERCASE_USERNAME)
    ).toBeNull();
  });
});

import { describe, expect, it } from "vitest";
import { PASSWORD_CHANGE_ERROR_CODE } from "@/app/constants";
import { createPasswordChangeError } from "../createPasswordChangeError";
import { isBlockedPasswordChangeError } from "../isBlockedPasswordChangeError";

describe("isBlockedPasswordChangeError", () => {
  it.each([
    PASSWORD_CHANGE_ERROR_CODE.ACCOUNT_BLOCKED_BY_ADMINISTRATION,
    PASSWORD_CHANGE_ERROR_CODE.ACCOUNT_BLOCKED_BY_ATTEMPTS,
  ])("recognises %s as a block", (code) => {
    expect(
      isBlockedPasswordChangeError(
        createPasswordChangeError(code)
      )
    ).toBe(true);
  });

  it.each(
    Object.values(PASSWORD_CHANGE_ERROR_CODE).filter(
      (code) =>
        code !==
          PASSWORD_CHANGE_ERROR_CODE.ACCOUNT_BLOCKED_BY_ADMINISTRATION &&
        code !==
          PASSWORD_CHANGE_ERROR_CODE.ACCOUNT_BLOCKED_BY_ATTEMPTS
    )
  )("does not treat %s as a block", (code) => {
    expect(
      isBlockedPasswordChangeError(
        createPasswordChangeError(code)
      )
    ).toBe(false);
  });
});

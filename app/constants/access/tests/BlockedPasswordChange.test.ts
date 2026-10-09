import { describe, expect, it } from "vitest";
import {
  BLOCKED_PASSWORD_CHANGE_ERROR_CODES,
  BLOCKED_PASSWORD_CHANGE_NOTICE_REASON,
} from "../BlockedPasswordChange.constants";
import { SIGN_IN_NOTICE_ERROR_CODE } from "../SignInNotice.constants";

describe("blocked password change codes", () => {
  it.each(BLOCKED_PASSWORD_CHANGE_ERROR_CODES)(
    "maps %s to a reason whose sign-in code is the same",
    (code) => {
      const reason =
        BLOCKED_PASSWORD_CHANGE_NOTICE_REASON[code];

      expect(SIGN_IN_NOTICE_ERROR_CODE[reason]).toBe(code);
    }
  );

  it("blocks as many codes as the sign-in notice has block reasons", () => {
    expect(
      new Set(
        Object.values(BLOCKED_PASSWORD_CHANGE_NOTICE_REASON)
      ).size
    ).toBe(BLOCKED_PASSWORD_CHANGE_ERROR_CODES.length);
  });
});

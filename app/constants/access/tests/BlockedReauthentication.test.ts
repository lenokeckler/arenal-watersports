import { describe, expect, it } from "vitest";
import {
  BLOCKED_REAUTHENTICATION_ERROR_CODES,
  BLOCKED_REAUTHENTICATION_NOTICE_REASON,
} from "../BlockedReauthentication.constants";
import { SIGN_IN_NOTICE_ERROR_CODE } from "../SignInNotice.constants";

describe("blocked reauthentication codes", () => {
  it.each(BLOCKED_REAUTHENTICATION_ERROR_CODES)(
    "maps %s to a reason whose sign-in code is the same",
    (code) => {
      const reason =
        BLOCKED_REAUTHENTICATION_NOTICE_REASON[code];

      expect(SIGN_IN_NOTICE_ERROR_CODE[reason]).toBe(code);
    }
  );

  it("blocks as many codes as the sign-in notice has block reasons", () => {
    expect(
      new Set(
        Object.values(
          BLOCKED_REAUTHENTICATION_NOTICE_REASON
        )
      ).size
    ).toBe(BLOCKED_REAUTHENTICATION_ERROR_CODES.length);
  });
});

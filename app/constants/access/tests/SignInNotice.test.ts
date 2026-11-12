import { describe, expect, it } from "vitest";
import { SIGN_IN_ERROR_CODE } from "../SignInError.constants";
import {
  SIGN_IN_NOTICE_ERROR_CODE,
  SIGN_IN_NOTICE_REASON,
} from "../SignInNotice.constants";

describe("sign-in notice reasons", () => {
  it("maps the attempts block to its blocked sign-in code", () => {
    expect(
      SIGN_IN_NOTICE_ERROR_CODE[
        SIGN_IN_NOTICE_REASON.BLOCKED_BY_ATTEMPTS
      ]
    ).toBe(SIGN_IN_ERROR_CODE.ACCOUNT_BLOCKED_BY_ATTEMPTS);
  });

  it("maps the administration block to its blocked sign-in code", () => {
    expect(
      SIGN_IN_NOTICE_ERROR_CODE[
        SIGN_IN_NOTICE_REASON.BLOCKED_BY_ADMINISTRATION
      ]
    ).toBe(
      SIGN_IN_ERROR_CODE.ACCOUNT_BLOCKED_BY_ADMINISTRATION
    );
  });

  it("gives every reason a different query value", () => {
    const values = Object.values(SIGN_IN_NOTICE_REASON);

    expect(new Set(values).size).toBe(values.length);
  });
});

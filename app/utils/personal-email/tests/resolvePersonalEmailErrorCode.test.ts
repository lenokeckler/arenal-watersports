import { describe, expect, it } from "vitest";
import {
  PASSWORD_CHANGE_ERROR_CODE,
  PERSONAL_EMAIL_ERROR_CODE,
} from "@/app/constants";
import { resolvePersonalEmailErrorCode } from "../resolvePersonalEmailErrorCode";
import { PROTOTYPE_KEY_CODE } from "./personalEmail.constants";

describe("resolvePersonalEmailErrorCode", () => {
  it.each(Object.values(PERSONAL_EMAIL_ERROR_CODE))(
    "keeps the personal email code %s",
    (code) => {
      expect(resolvePersonalEmailErrorCode(code)).toBe(
        code
      );
    }
  );

  it("turns a password change code with no personal email counterpart into unknown", () => {
    expect(
      resolvePersonalEmailErrorCode(
        PASSWORD_CHANGE_ERROR_CODE.CONFIRMATION_MISMATCH
      )
    ).toBe(PERSONAL_EMAIL_ERROR_CODE.UNKNOWN);
  });

  it("turns an inherited object key into unknown", () => {
    expect(
      resolvePersonalEmailErrorCode(PROTOTYPE_KEY_CODE)
    ).toBe(PERSONAL_EMAIL_ERROR_CODE.UNKNOWN);
  });
});

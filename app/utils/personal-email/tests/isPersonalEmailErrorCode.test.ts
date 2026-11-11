import { describe, expect, it } from "vitest";
import {
  PASSWORD_CHANGE_ERROR_CODE,
  PERSONAL_EMAIL_ERROR_CODE,
} from "@/app/constants";
import { isPersonalEmailErrorCode } from "../isPersonalEmailErrorCode";
import { PROTOTYPE_KEY_CODE } from "./personalEmail.constants";

describe("isPersonalEmailErrorCode", () => {
  it.each(Object.values(PERSONAL_EMAIL_ERROR_CODE))(
    "accepts the personal email code %s",
    (code) => {
      expect(isPersonalEmailErrorCode(code)).toBe(true);
    }
  );

  it("rejects a password change code with no personal email counterpart", () => {
    expect(
      isPersonalEmailErrorCode(
        PASSWORD_CHANGE_ERROR_CODE.CONFIRMATION_MISMATCH
      )
    ).toBe(false);
  });

  it("rejects an inherited object key", () => {
    expect(
      isPersonalEmailErrorCode(PROTOTYPE_KEY_CODE)
    ).toBe(false);
  });
});

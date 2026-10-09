import { describe, expect, it } from "vitest";
import {
  PERSONAL_EMAIL_ERROR_CODE,
  STRING,
} from "@/app/constants";
import { validatePersonalEmailAddress } from "../validatePersonalEmailAddress";
import {
  ACCEPTED_ADDRESS_CASES,
  ADDRESS_ONE_ABOVE_MAX,
  INVALID_ADDRESS_CASES,
} from "./personalEmail.constants";

describe("validatePersonalEmailAddress", () => {
  it.each(ACCEPTED_ADDRESS_CASES)(
    "accepts %s",
    (_label, raw, address) => {
      expect(validatePersonalEmailAddress(raw)).toEqual({
        address,
        ok: true,
      });
    }
  );

  it.each(INVALID_ADDRESS_CASES)(
    "rejects %s",
    (_label, raw) => {
      expect(validatePersonalEmailAddress(raw)).toEqual({
        code: PERSONAL_EMAIL_ERROR_CODE.EMAIL_INVALID,
        ok: false,
      });
    }
  );

  it.each([STRING.Empty, STRING.SPACE])(
    "requires a value for %j",
    (raw) => {
      expect(validatePersonalEmailAddress(raw)).toEqual({
        code: PERSONAL_EMAIL_ERROR_CODE.EMAIL_REQUIRED,
        ok: false,
      });
    }
  );

  it("reports the length before the pattern", () => {
    expect(
      validatePersonalEmailAddress(ADDRESS_ONE_ABOVE_MAX)
    ).toEqual({
      code: PERSONAL_EMAIL_ERROR_CODE.EMAIL_TOO_LONG,
      ok: false,
    });
  });
});

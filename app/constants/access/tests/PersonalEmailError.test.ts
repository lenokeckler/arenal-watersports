import { describe, expect, it } from "vitest";
import {
  PERSONAL_EMAIL_ERROR_CODE,
  PERSONAL_EMAIL_ERROR_FIELD,
  PERSONAL_EMAIL_FIELD,
} from "../PersonalEmailError.constants";
import { REAUTHENTICATION_ERROR_CODE } from "../Reauthentication.constants";

describe("personal email error codes", () => {
  it.each(Object.values(PERSONAL_EMAIL_ERROR_CODE))(
    "pairs %s with a known field",
    (code) => {
      expect(Object.values(PERSONAL_EMAIL_FIELD)).toContain(
        PERSONAL_EMAIL_ERROR_FIELD[code]
      );
    }
  );

  it("places the recovery required refusal on the form", () => {
    expect(
      PERSONAL_EMAIL_ERROR_FIELD[
        PERSONAL_EMAIL_ERROR_CODE.ACCOUNT_RECOVERY_REQUIRED
      ]
    ).toBe(PERSONAL_EMAIL_FIELD.FORM);
  });

  it.each(Object.values(REAUTHENTICATION_ERROR_CODE))(
    "includes the re-authentication code %s",
    (code) => {
      expect(
        Object.values(PERSONAL_EMAIL_ERROR_CODE)
      ).toContain(code);
    }
  );
});

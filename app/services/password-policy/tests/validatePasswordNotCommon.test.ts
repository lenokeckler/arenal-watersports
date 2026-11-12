import { describe, expect, it } from "vitest";
import {
  PASSWORD_CHANGE_ERROR_CODE,
  PASSWORD_CHANGE_FIELD,
} from "@/app/constants";
import { validatePasswordNotCommon } from "../validatePasswordNotCommon";
import {
  COMMON_PASSWORD_THAT_MEETS_THE_RULES,
  UNLISTED_PASSWORD,
} from "./commonPassword.constants";

describe("validatePasswordNotCommon", () => {
  it("refuses a common password on the new password field", () => {
    expect(
      validatePasswordNotCommon(
        COMMON_PASSWORD_THAT_MEETS_THE_RULES
      )
    ).toEqual({
      code: PASSWORD_CHANGE_ERROR_CODE.NEW_PASSWORD_COMMON,
      field: PASSWORD_CHANGE_FIELD.NEW_PASSWORD,
    });
  });

  it("accepts a password that is not on the list", () => {
    expect(
      validatePasswordNotCommon(UNLISTED_PASSWORD)
    ).toBeNull();
  });
});

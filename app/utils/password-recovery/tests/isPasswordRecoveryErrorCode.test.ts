import { describe, expect, it } from "vitest";
import {
  PASSWORD_CHANGE_ERROR_CODE,
  PASSWORD_RECOVERY_ERROR_CODE,
} from "@/app/constants";
import { isPasswordRecoveryErrorCode } from "../isPasswordRecoveryErrorCode";
import {
  INHERITED_OBJECT_KEYS,
  UNLISTED_ERROR_CODE,
} from "./passwordRecovery.constants";

describe("isPasswordRecoveryErrorCode", () => {
  it.each(Object.values(PASSWORD_RECOVERY_ERROR_CODE))(
    "accepts %s",
    (code) => {
      expect(isPasswordRecoveryErrorCode(code)).toBe(true);
    }
  );

  it.each([
    PASSWORD_CHANGE_ERROR_CODE.CURRENT_PASSWORD_INVALID,
    PASSWORD_CHANGE_ERROR_CODE.NEW_PASSWORD_SAME_AS_CURRENT,
    UNLISTED_ERROR_CODE,
    ...INHERITED_OBJECT_KEYS,
  ])("rejects %s", (code) => {
    expect(isPasswordRecoveryErrorCode(code)).toBe(false);
  });
});

import { describe, expect, it } from "vitest";
import {
  BLOCKED_PASSWORD_CHANGE_ERROR_CODES,
  PASSWORD_CHANGE_ERROR_CODE,
} from "@/app/constants";
import { createPasswordChangeError } from "../createPasswordChangeError";
import { isBlockedPasswordChangeErrorCode } from "../isBlockedPasswordChangeErrorCode";
import { isBlockedPasswordChangeError } from "../isBlockedPasswordChangeError";
import { PROTOTYPE_KEY_ERRORS } from "./passwordChange.constants";

describe("isBlockedPasswordChangeError", () => {
  it.each(BLOCKED_PASSWORD_CHANGE_ERROR_CODES)(
    "recognises %s as a block",
    (code) => {
      expect(
        isBlockedPasswordChangeError(
          createPasswordChangeError(code)
        )
      ).toBe(true);
    }
  );

  it.each(
    Object.values(PASSWORD_CHANGE_ERROR_CODE).filter(
      (code) => !isBlockedPasswordChangeErrorCode(code)
    )
  )("does not treat %s as a block", (code) => {
    expect(
      isBlockedPasswordChangeError(
        createPasswordChangeError(code)
      )
    ).toBe(false);
  });

  it.each(PROTOTYPE_KEY_ERRORS)(
    "does not treat the inherited key $code as a block",
    (error) => {
      expect(isBlockedPasswordChangeError(error)).toBe(
        false
      );
    }
  );
});

import { describe, expect, it } from "vitest";
import {
  BLOCKED_REAUTHENTICATION_ERROR_CODES,
  PASSWORD_CHANGE_ERROR_CODE,
} from "@/app/constants";
import { createPasswordChangeError } from "@/app/utils/password-change/createPasswordChangeError";
import { isBlockedReauthenticationErrorCode } from "../isBlockedReauthenticationErrorCode";
import { isBlockedReauthenticationError } from "../isBlockedReauthenticationError";
import { PROTOTYPE_KEY_ERRORS } from "./prototypeKeyErrors.constants";

describe("isBlockedReauthenticationError", () => {
  it.each(BLOCKED_REAUTHENTICATION_ERROR_CODES)(
    "recognises %s as a block",
    (code) => {
      expect(
        isBlockedReauthenticationError(
          createPasswordChangeError(code)
        )
      ).toBe(true);
    }
  );

  it.each(
    Object.values(PASSWORD_CHANGE_ERROR_CODE).filter(
      (code) => !isBlockedReauthenticationErrorCode(code)
    )
  )("does not treat %s as a block", (code) => {
    expect(
      isBlockedReauthenticationError(
        createPasswordChangeError(code)
      )
    ).toBe(false);
  });

  it.each(PROTOTYPE_KEY_ERRORS)(
    "does not treat the inherited key $code as a block",
    (error) => {
      expect(isBlockedReauthenticationError(error)).toBe(
        false
      );
    }
  );
});

import { describe, expect, it } from "vitest";
import {
  BLOCKED_PASSWORD_CHANGE_ERROR_CODES,
  BLOCKED_PASSWORD_CHANGE_NOTICE_REASON,
} from "@/app/constants";
import { createPasswordChangeError } from "@/app/utils/password-change/createPasswordChangeError";
import { resolveBlockedSignInNoticeReason } from "../utils/resolveBlockedSignInNoticeReason";
import { PROTOTYPE_KEY_ERRORS } from "@/app/utils/password-change/tests/passwordChange.constants";
import { NON_BLOCKED_CODES } from "./resolveBlockedSignInNoticeReason.constants";

describe("resolveBlockedSignInNoticeReason", () => {
  it.each(BLOCKED_PASSWORD_CHANGE_ERROR_CODES)(
    "resolves the notice reason of %s",
    (code) => {
      expect(
        resolveBlockedSignInNoticeReason(
          createPasswordChangeError(code)
        )
      ).toBe(BLOCKED_PASSWORD_CHANGE_NOTICE_REASON[code]);
    }
  );

  it.each(NON_BLOCKED_CODES)(
    "returns null for %s",
    (code) => {
      expect(
        resolveBlockedSignInNoticeReason(
          createPasswordChangeError(code)
        )
      ).toBeNull();
    }
  );

  it.each(PROTOTYPE_KEY_ERRORS)(
    "returns null for the inherited key $code",
    (error) => {
      expect(
        resolveBlockedSignInNoticeReason(error)
      ).toBeNull();
    }
  );
});

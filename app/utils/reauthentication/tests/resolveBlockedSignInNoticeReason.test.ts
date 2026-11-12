import { describe, expect, it } from "vitest";
import {
  BLOCKED_REAUTHENTICATION_ERROR_CODES,
  BLOCKED_REAUTHENTICATION_NOTICE_REASON,
} from "@/app/constants";
import { createPasswordChangeError } from "@/app/utils/password-change/createPasswordChangeError";
import { resolveBlockedSignInNoticeReason } from "../resolveBlockedSignInNoticeReason";
import { PROTOTYPE_KEY_ERRORS } from "./prototypeKeyErrors.constants";
import { NON_BLOCKED_CODES } from "./resolveBlockedSignInNoticeReason.constants";

describe("resolveBlockedSignInNoticeReason", () => {
  it.each(BLOCKED_REAUTHENTICATION_ERROR_CODES)(
    "resolves the notice reason of %s",
    (code) => {
      expect(
        resolveBlockedSignInNoticeReason(
          createPasswordChangeError(code)
        )
      ).toBe(BLOCKED_REAUTHENTICATION_NOTICE_REASON[code]);
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

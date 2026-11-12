import { describe, expect, it } from "vitest";
import { PASSWORD_RECOVERY_ERROR_CODE } from "@/app/constants";
import {
  TUTEO_WORDS_PATTERN,
  VOSEO_WORDS_PATTERN,
} from "@/app/utils/copy/tests/ustedCopyPatterns";
import { PASSWORD_RECOVERY_RESET_COPY } from "../constants/PasswordRecoveryResetCopy.constants";
import { PASSWORD_RECOVERY_RESET_ERROR_COPY } from "../constants/PasswordRecoveryResetErrorCopy.constants";
import { PASSWORD_RECOVERY_RESET_METADATA } from "../constants/PasswordRecoveryResetMetadata.constants";
import {
  ALL_RESET_COPY,
  APPROVED_RESET_COPY,
  APPROVED_RESET_ERROR_COPY,
  APPROVED_RESET_UNKNOWN_COPY,
  SIGN_IN_UNKNOWN_COPY,
} from "./PasswordRecoveryResetCopy.constants";

describe("password recovery reset copy", () => {
  it.each(ALL_RESET_COPY)(
    "has non-empty usted copy for %s",
    (_key, text) => {
      expect(text.trim()).not.toBe("");
      expect(text).not.toMatch(VOSEO_WORDS_PATTERN);
      expect(text).not.toMatch(TUTEO_WORDS_PATTERN);
    }
  );

  it.each(Object.values(PASSWORD_RECOVERY_ERROR_CODE))(
    "has an error text for %s",
    (code) => {
      expect(
        PASSWORD_RECOVERY_RESET_ERROR_COPY[code]
      ).toBeTruthy();
    }
  );

  it("matches the approved screen text exactly", () => {
    expect(PASSWORD_RECOVERY_RESET_COPY).toEqual(
      APPROVED_RESET_COPY
    );
  });

  it("matches the approved error text exactly", () => {
    expect(PASSWORD_RECOVERY_RESET_ERROR_COPY).toEqual(
      APPROVED_RESET_ERROR_COPY
    );
  });

  it("never uses the sign-in unknown text", () => {
    const unknownText =
      PASSWORD_RECOVERY_RESET_ERROR_COPY[
        PASSWORD_RECOVERY_ERROR_CODE.UNKNOWN
      ];

    expect(unknownText).toBe(APPROVED_RESET_UNKNOWN_COPY);
    expect(unknownText).not.toBe(SIGN_IN_UNKNOWN_COPY);
  });

  it("titles the page with its metadata title", () => {
    expect(PASSWORD_RECOVERY_RESET_METADATA.title).toBe(
      PASSWORD_RECOVERY_RESET_COPY.METADATA_TITLE
    );
  });
});

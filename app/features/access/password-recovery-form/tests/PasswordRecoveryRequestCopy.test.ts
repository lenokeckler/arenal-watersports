import { describe, expect, it } from "vitest";
import { PASSWORD_RECOVERY_ERROR_CODE } from "@/app/constants";
import {
  TUTEO_WORDS_PATTERN,
  VOSEO_WORDS_PATTERN,
} from "@/app/utils/copy/tests/ustedCopyPatterns";
import { PASSWORD_RECOVERY_REQUEST_COPY } from "../constants/PasswordRecoveryRequestCopy.constants";
import { PASSWORD_RECOVERY_REQUEST_ERROR_COPY } from "../constants/PasswordRecoveryRequestErrorCopy.constants";
import { PASSWORD_RECOVERY_REQUEST_METADATA } from "../constants/PasswordRecoveryRequestMetadata.constants";
import {
  ALL_COPY,
  APPROVED_ERROR_COPY,
  APPROVED_REQUEST_COPY,
  APPROVED_UNKNOWN_COPY,
  TUTEO_SAMPLES,
  VOSEO_SAMPLES,
} from "./PasswordRecoveryRequestCopy.constants";

describe("password recovery request copy", () => {
  it.each(ALL_COPY)(
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
        PASSWORD_RECOVERY_REQUEST_ERROR_COPY[code]
      ).toBeTruthy();
    }
  );

  it.each(VOSEO_SAMPLES)(
    "detects the voseo in %s",
    (text) => {
      expect(text).toMatch(VOSEO_WORDS_PATTERN);
    }
  );

  it.each(TUTEO_SAMPLES)(
    "detects the tuteo in %s",
    (text) => {
      expect(text).toMatch(TUTEO_WORDS_PATTERN);
    }
  );

  it("matches the approved screen text exactly", () => {
    expect(PASSWORD_RECOVERY_REQUEST_COPY).toEqual(
      APPROVED_REQUEST_COPY
    );
  });

  it("matches the approved error text exactly", () => {
    expect(
      PASSWORD_RECOVERY_REQUEST_ERROR_COPY
    ).toMatchObject(APPROVED_ERROR_COPY);
  });

  it("never uses the sign-in unknown text", () => {
    expect(
      PASSWORD_RECOVERY_REQUEST_ERROR_COPY[
        PASSWORD_RECOVERY_ERROR_CODE.UNKNOWN
      ]
    ).toBe(APPROVED_UNKNOWN_COPY);
  });

  it("titles the page with its metadata title", () => {
    expect(PASSWORD_RECOVERY_REQUEST_METADATA.title).toBe(
      PASSWORD_RECOVERY_REQUEST_COPY.METADATA_TITLE
    );
  });
});

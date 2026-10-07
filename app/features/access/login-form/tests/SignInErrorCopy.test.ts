import { describe, expect, it } from "vitest";
import {
  SIGN_IN_ERROR_CODE,
  SIGN_IN_ERROR_FIELD,
  SIGN_IN_FIELD,
} from "@/app/constants";
import { SIGN_IN_ERROR_COPY } from "../constants/SignInErrorCopy.constants";
import {
  GENERIC_CREDENTIALS_COPY,
  NON_USTED_WORDS_PATTERN,
} from "./SignInErrorCopy.constants";

const ACCOUNT_AND_SESSION_CODES = [
  SIGN_IN_ERROR_CODE.ACCOUNT_BLOCKED_BY_ADMINISTRATION,
  SIGN_IN_ERROR_CODE.ACCOUNT_BLOCKED_BY_ATTEMPTS,
  SIGN_IN_ERROR_CODE.SESSION_INACTIVE,
];

describe("sign-in error copy", () => {
  it.each(Object.values(SIGN_IN_ERROR_CODE))(
    "has usted copy for %s",
    (code) => {
      expect(SIGN_IN_ERROR_COPY[code]).not.toBe("");
      expect(SIGN_IN_ERROR_COPY[code]).not.toMatch(
        NON_USTED_WORDS_PATTERN
      );
    }
  );

  it.each(ACCOUNT_AND_SESSION_CODES)(
    "shows %s in the form banner",
    (code) => {
      expect(SIGN_IN_ERROR_FIELD[code]).toBe(
        SIGN_IN_FIELD.FORM
      );
    }
  );

  it("keeps the generic credentials text for wrong password and unknown user", () => {
    expect(
      SIGN_IN_ERROR_COPY[
        SIGN_IN_ERROR_CODE.INVALID_CREDENTIALS
      ]
    ).toBe(GENERIC_CREDENTIALS_COPY);
  });

  it("gives each message its own text", () => {
    const texts = Object.values(SIGN_IN_ERROR_COPY);

    expect(new Set(texts).size).toBe(texts.length);
  });
});

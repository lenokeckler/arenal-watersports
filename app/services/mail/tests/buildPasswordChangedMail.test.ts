import { describe, expect, it } from "vitest";
import {
  TUTEO_WORDS_PATTERN,
  VOSEO_WORDS_PATTERN,
} from "@/app/utils/copy/tests/ustedCopyPatterns";
import { buildPasswordChangedMail } from "../buildPasswordChangedMail";
import {
  ANY_DIGIT_PATTERN,
  APPROVED_CHANGED_MAIL_SUBJECT,
  APPROVED_CHANGED_MAIL_TEXT,
  CHANGED_MAIL_INPUT,
  PIN_LENGTH_DIGITS_PATTERN,
} from "./passwordChangedMail.constants";
import {} from "./passwordResetPinMail.constants";
import {
  LINK_SAMPLES,
  URL_PATTERN,
} from "./mail.constants";

describe("buildPasswordChangedMail", () => {
  const message = buildPasswordChangedMail(
    CHANGED_MAIL_INPUT
  );

  it("addresses the personal email", () => {
    expect(message.to).toBe(
      CHANGED_MAIL_INPUT.personalEmail
    );
  });

  it("uses the approved subject exactly", () => {
    expect(message.subject).toBe(
      APPROVED_CHANGED_MAIL_SUBJECT
    );
  });

  it("uses the approved text exactly", () => {
    expect(message.text).toBe(APPROVED_CHANGED_MAIL_TEXT);
  });

  it("carries no digit sequence of PIN length", () => {
    expect(message.text).not.toMatch(
      PIN_LENGTH_DIGITS_PATTERN
    );
    expect(message.subject).not.toMatch(
      PIN_LENGTH_DIGITS_PATTERN
    );
  });

  it("carries no digit at all", () => {
    expect(message.text).not.toMatch(ANY_DIGIT_PATTERN);
    expect(message.subject).not.toMatch(ANY_DIGIT_PATTERN);
  });

  it.each(LINK_SAMPLES)("detects the link %s", (sample) => {
    expect(sample).toMatch(URL_PATTERN);
  });

  it("carries no link", () => {
    expect(message.text).not.toMatch(URL_PATTERN);
    expect(message.subject).not.toMatch(URL_PATTERN);
  });

  it("addresses the worker as usted", () => {
    expect(message.text).not.toMatch(VOSEO_WORDS_PATTERN);
    expect(message.text).not.toMatch(TUTEO_WORDS_PATTERN);
    expect(message.subject).not.toMatch(
      VOSEO_WORDS_PATTERN
    );
    expect(message.subject).not.toMatch(
      TUTEO_WORDS_PATTERN
    );
  });
});

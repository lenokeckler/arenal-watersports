import { describe, expect, it } from "vitest";
import {
  TUTEO_WORDS_PATTERN,
  VOSEO_WORDS_PATTERN,
} from "@/app/utils/copy/tests/ustedCopyPatterns";
import { buildPasswordResetPinMail } from "../buildPasswordResetPinMail";
import {
  APPROVED_PIN_MAIL_SUBJECT,
  APPROVED_PIN_MAIL_TEXT,
  DIGIT_PATTERN,
  LEADING_ZEROS_PIN,
  LIFETIME_PHRASE_PREFIX,
  LINK_SAMPLES,
  OTHER_LIFETIME_MINUTES,
  PIN_MAIL_LINE_BREAK,
  SINGLE_MINUTE,
  PIN_LINE_PATTERN,
  PIN_MAIL_INPUT,
  URL_PATTERN,
} from "./passwordResetPinMail.constants";

describe("buildPasswordResetPinMail", () => {
  const message = buildPasswordResetPinMail(PIN_MAIL_INPUT);

  it("addresses the personal email", () => {
    expect(message.to).toBe(PIN_MAIL_INPUT.personalEmail);
  });

  it("uses the approved subject exactly", () => {
    expect(message.subject).toBe(APPROVED_PIN_MAIL_SUBJECT);
  });

  it("uses the approved text exactly", () => {
    expect(message.text).toBe(APPROVED_PIN_MAIL_TEXT);
  });

  it("keeps the PIN out of the subject and any digit too", () => {
    expect(message.subject).not.toContain(
      PIN_MAIL_INPUT.pin
    );
    expect(message.subject).not.toMatch(DIGIT_PATTERN);
  });

  it("writes the PIN once, alone on its line", () => {
    const lines = message.text.split(PIN_MAIL_LINE_BREAK);

    expect(
      message.text.split(PIN_MAIL_INPUT.pin)
    ).toHaveLength(2);
    expect(lines).toContain(PIN_MAIL_INPUT.pin);
  });

  it("keeps a PIN with leading zeros as text, digit for digit", () => {
    const zeros = buildPasswordResetPinMail({
      ...PIN_MAIL_INPUT,
      pin: LEADING_ZEROS_PIN,
    });

    expect(zeros.text.split(PIN_MAIL_LINE_BREAK)).toContain(
      LEADING_ZEROS_PIN
    );
  });

  it("exposes exactly one six-digit line, the PIN", () => {
    const matches = message.text.match(PIN_LINE_PATTERN);

    expect(matches).toEqual([PIN_MAIL_INPUT.pin]);
  });

  it("states the lifetime in minutes", () => {
    expect(message.text).toContain(
      `${LIFETIME_PHRASE_PREFIX} ${PIN_MAIL_INPUT.lifetimeMinutes} minutos`
    );
  });

  it("follows the lifetime it is given", () => {
    const other = buildPasswordResetPinMail({
      ...PIN_MAIL_INPUT,
      lifetimeMinutes: OTHER_LIFETIME_MINUTES,
    });

    expect(other.text).toContain(
      `${LIFETIME_PHRASE_PREFIX} ${OTHER_LIFETIME_MINUTES} minutos`
    );
  });

  it("uses the singular for one minute", () => {
    const single = buildPasswordResetPinMail({
      ...PIN_MAIL_INPUT,
      lifetimeMinutes: SINGLE_MINUTE,
    });

    expect(single.text).toContain(
      `${LIFETIME_PHRASE_PREFIX} ${SINGLE_MINUTE} minuto `
    );
    expect(single.text).not.toContain("minutos");
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

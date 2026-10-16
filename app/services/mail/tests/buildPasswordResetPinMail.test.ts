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
  PIN_MAIL_INPUT,
  PIN_MAIL_USERNAME,
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
    const lines = message.text.split("\n");

    expect(
      message.text.split(PIN_MAIL_INPUT.pin)
    ).toHaveLength(2);
    expect(lines).toContain(PIN_MAIL_INPUT.pin);
  });

  it("states the lifetime in minutes", () => {
    expect(message.text).toContain(
      `Vence en ${PIN_MAIL_INPUT.lifetimeMinutes} minutos`
    );
  });

  it("follows the lifetime it is given", () => {
    const other = buildPasswordResetPinMail({
      ...PIN_MAIL_INPUT,
      lifetimeMinutes: 7,
    });

    expect(other.text).toContain("Vence en 7 minutos");
  });

  it("carries no link", () => {
    expect(message.text).not.toMatch(URL_PATTERN);
    expect(message.subject).not.toMatch(URL_PATTERN);
  });

  it("never mentions the username", () => {
    expect(message.text).not.toContain(PIN_MAIL_USERNAME);
    expect(message.subject).not.toContain(
      PIN_MAIL_USERNAME
    );
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

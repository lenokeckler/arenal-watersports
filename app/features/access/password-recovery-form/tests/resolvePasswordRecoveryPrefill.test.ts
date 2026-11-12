import { describe, expect, it } from "vitest";
import { STRING } from "@/app/constants";
import { resolvePasswordRecoveryPrefill } from "../utils/resolvePasswordRecoveryPrefill";
import {
  ACCEPTED_USERNAME,
  MAX_LENGTH_USERNAME,
  PADDED_MIXED_CASE_USERNAME,
  REPEATED_PARAM,
  TOO_LONG_USERNAME,
  TOO_SHORT_USERNAME,
  WHITESPACE_ONLY,
} from "./passwordRecoveryPrefill.constants";

describe("resolvePasswordRecoveryPrefill", () => {
  it.each([
    [ACCEPTED_USERNAME, ACCEPTED_USERNAME],
    [PADDED_MIXED_CASE_USERNAME, ACCEPTED_USERNAME],
    [MAX_LENGTH_USERNAME, MAX_LENGTH_USERNAME],
  ])("accepts %j as %j", (queryValue, expected) => {
    expect(resolvePasswordRecoveryPrefill(queryValue)).toBe(
      expected
    );
  });

  it.each([
    TOO_SHORT_USERNAME,
    WHITESPACE_ONLY,
    STRING.Empty,
    TOO_LONG_USERNAME,
    undefined,
    REPEATED_PARAM,
  ])("rejects %j", (queryValue) => {
    expect(resolvePasswordRecoveryPrefill(queryValue)).toBe(
      STRING.Empty
    );
  });
});

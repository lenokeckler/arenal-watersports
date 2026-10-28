import { describe, expect, it } from "vitest";
import { SIGN_IN_HOOK_REJECTION } from "@/app/constants";
import { resolveHookRejection } from "../resolveHookRejection";
import {
  BLOCKED_BY_ADMINISTRATION_ERROR,
  BLOCKED_BY_ATTEMPTS_ERROR,
  TOKEN_WITH_WRONG_CODE_ERROR,
  TOKEN_WITH_WRONG_STATUS_ERROR,
  UNAVAILABLE_ERROR,
  UNKNOWN_TOKEN_ERROR,
  WRAPPED_TOKEN_ERROR,
} from "./hookRejectionErrors.constants";
import {
  INVALID_CREDENTIALS_ERROR,
  NETWORK_ERROR,
} from "./mapSignInAuthError.constants";

describe("resolveHookRejection", () => {
  it.each([
    [
      "blocked by attempts",
      BLOCKED_BY_ATTEMPTS_ERROR,
      SIGN_IN_HOOK_REJECTION.BLOCKED_BY_ATTEMPTS,
    ],
    [
      "blocked by administration",
      BLOCKED_BY_ADMINISTRATION_ERROR,
      SIGN_IN_HOOK_REJECTION.BLOCKED_BY_ADMINISTRATION,
    ],
    [
      "unavailable",
      UNAVAILABLE_ERROR,
      SIGN_IN_HOOK_REJECTION.UNAVAILABLE,
    ],
  ])(
    "returns the token of a %s rejection",
    (_name, error, token) => {
      expect(resolveHookRejection(error)).toBe(token);
    }
  );

  it.each([
    ["an unknown token", UNKNOWN_TOKEN_ERROR],
    [
      "a token wrapped in a longer message",
      WRAPPED_TOKEN_ERROR,
    ],
    [
      "a token with the wrong status",
      TOKEN_WITH_WRONG_STATUS_ERROR,
    ],
    [
      "a token with the wrong code",
      TOKEN_WITH_WRONG_CODE_ERROR,
    ],
    [
      "an invalid credentials error",
      INVALID_CREDENTIALS_ERROR,
    ],
    ["a network error", NETWORK_ERROR],
  ])("returns null for %s", (_name, error) => {
    expect(resolveHookRejection(error)).toBeNull();
  });
});

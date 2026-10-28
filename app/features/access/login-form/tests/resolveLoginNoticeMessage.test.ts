import { describe, expect, it } from "vitest";
import { LOGIN_NOTICE } from "@/app/constants";
import { resolveLoginNoticeMessage } from "../utils/resolveLoginNoticeMessage";
import {
  ARRAY_LOGIN_NOTICE,
  RECOVERED_NOTICE,
  SIGNED_OUT_NOTICE,
  UNKNOWN_LOGIN_NOTICE,
} from "./LoginNotice.constants";

describe("resolveLoginNoticeMessage", () => {
  it("returns the message for an exact match", () => {
    expect(
      resolveLoginNoticeMessage(
        LOGIN_NOTICE.PASSWORD_RECOVERED
      )
    ).toBe(RECOVERED_NOTICE);
  });

  it("returns the signed-out message for the signed-out notice", () => {
    expect(
      resolveLoginNoticeMessage(LOGIN_NOTICE.SIGNED_OUT)
    ).toBe(SIGNED_OUT_NOTICE);
  });

  it.each([
    ["an unknown value", UNKNOWN_LOGIN_NOTICE],
    ["a missing value", undefined],
    ["an array", ARRAY_LOGIN_NOTICE],
  ])("returns null for %s", (_label, notice) => {
    expect(resolveLoginNoticeMessage(notice)).toBeNull();
  });
});

import { describe, expect, it } from "vitest";
import {
  SIGN_IN_ERROR_CODE,
  SIGN_IN_NOTICE_REASON,
} from "@/app/constants";
import { createSignInError } from "../createSignInError";
import { resolveSignInNotice } from "../resolveSignInNotice";
import { UNSUPPORTED_REASONS } from "./resolveSignInNotice.constants";

describe("resolveSignInNotice", () => {
  it("turns the inactive reason into the session inactive error", () => {
    expect(
      resolveSignInNotice(SIGN_IN_NOTICE_REASON.INACTIVE)
    ).toEqual(
      createSignInError(SIGN_IN_ERROR_CODE.SESSION_INACTIVE)
    );
  });

  it("returns null when there is no reason", () => {
    expect(resolveSignInNotice(undefined)).toBeNull();
  });

  it("returns null for a repeated reason", () => {
    expect(
      resolveSignInNotice([
        SIGN_IN_NOTICE_REASON.INACTIVE,
        SIGN_IN_NOTICE_REASON.INACTIVE,
      ])
    ).toBeNull();
  });

  it("returns null for a single-item array", () => {
    expect(
      resolveSignInNotice([SIGN_IN_NOTICE_REASON.INACTIVE])
    ).toBeNull();
  });

  it.each(UNSUPPORTED_REASONS)(
    "returns null for the unsupported reason %j",
    (reason) => {
      expect(resolveSignInNotice(reason)).toBeNull();
    }
  );
});

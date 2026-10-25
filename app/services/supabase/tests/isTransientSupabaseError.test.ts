import { describe, expect, it } from "vitest";
import { isTransientSupabaseError } from "../isTransientSupabaseError";
import { SESSION_STATE_FIXTURE } from "./readSessionState.constants";

describe("isTransientSupabaseError", () => {
  it("treats the last client error status as permanent", () => {
    expect(
      isTransientSupabaseError(
        SESSION_STATE_FIXTURE.LAST_CLIENT_ERROR_STATUS
      )
    ).toBe(false);
  });

  it("treats the first server error status as transient", () => {
    expect(
      isTransientSupabaseError(
        SESSION_STATE_FIXTURE.FIRST_SERVER_ERROR_STATUS
      )
    ).toBe(true);
  });

  it.each(SESSION_STATE_FIXTURE.CLIENT_ERROR_STATUSES)(
    "treats client error status %s as permanent",
    (status) => {
      expect(isTransientSupabaseError(status)).toBe(false);
    }
  );

  it.each(SESSION_STATE_FIXTURE.SERVER_ERROR_STATUSES)(
    "treats server error status %s as transient",
    (status) => {
      expect(isTransientSupabaseError(status)).toBe(true);
    }
  );

  it.each(SESSION_STATE_FIXTURE.NO_RESPONSE_STATUSES)(
    "treats the missing status %s as transient",
    (status) => {
      expect(isTransientSupabaseError(status)).toBe(true);
    }
  );
});

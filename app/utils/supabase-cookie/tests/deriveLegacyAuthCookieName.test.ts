import { describe, expect, it } from "vitest";
import { deriveLegacyAuthCookieName } from "../deriveLegacyAuthCookieName";
import { LEGACY_FIXTURE } from "./supabaseCookie.constants";

describe("deriveLegacyAuthCookieName", () => {
  it("uses the first host label like the library default", () => {
    expect(
      deriveLegacyAuthCookieName(LEGACY_FIXTURE.HOSTED_URL)
    ).toBe(LEGACY_FIXTURE.HOSTED_NAME);
  });

  it("uses the whole IP host label for the local stack", () => {
    expect(
      deriveLegacyAuthCookieName(LEGACY_FIXTURE.LOCAL_URL)
    ).toBe(LEGACY_FIXTURE.LOCAL_NAME);
  });
});

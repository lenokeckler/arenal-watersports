import { describe, expect, it } from "vitest";
import { deriveLegacyAuthCookieName } from "../deriveLegacyAuthCookieName";
import { holdsNoSupabaseAuthCookies } from "../holdsNoSupabaseAuthCookies";
import { COOKIE_FIXTURE } from "./supabaseCookie.constants";

describe("holdsNoSupabaseAuthCookies", () => {
  it("is true when only unrelated cookies remain", () => {
    expect(
      holdsNoSupabaseAuthCookies(
        `${COOKIE_FIXTURE.UNRELATED}=dark`
      )
    ).toBe(true);
  });

  it("is true for an empty header", () => {
    expect(holdsNoSupabaseAuthCookies("")).toBe(true);
  });

  it("is false while the auth cookie remains", () => {
    expect(
      holdsNoSupabaseAuthCookies(`${COOKIE_FIXTURE.NAME}=v`)
    ).toBe(false);
  });

  it("is false while an auth chunk remains", () => {
    expect(
      holdsNoSupabaseAuthCookies(
        `${COOKIE_FIXTURE.FIRST_CHUNK}=v`
      )
    ).toBe(false);
  });

  it("is false while the legacy cookie remains", () => {
    expect(
      holdsNoSupabaseAuthCookies(
        `${deriveLegacyAuthCookieName()}=v`
      )
    ).toBe(false);
  });
});

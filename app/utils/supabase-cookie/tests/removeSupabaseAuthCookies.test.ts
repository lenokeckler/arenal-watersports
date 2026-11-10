import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { deriveLegacyAuthCookieName } from "../deriveLegacyAuthCookieName";
import { removeSupabaseAuthCookies } from "../removeSupabaseAuthCookies";
import {
  COOKIE_FIXTURE,
  LEGACY_FIXTURE,
} from "./supabaseCookie.constants";
import {} from "./supabaseCookie.constants";

const spyOnCookieWrites = (
  cookieHeader: string
): string[] => {
  const writes: string[] = [];
  vi.spyOn(document, "cookie", "get").mockReturnValue(
    cookieHeader
  );
  vi.spyOn(document, "cookie", "set").mockImplementation(
    (value) => {
      writes.push(value);
    }
  );

  return writes;
};

describe("removeSupabaseAuthCookies", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("writes one expiring root-path cookie per auth cookie", () => {
    const writes = spyOnCookieWrites(
      `${COOKIE_FIXTURE.FIRST_CHUNK}=a; ${COOKIE_FIXTURE.UNRELATED}=x; ${COOKIE_FIXTURE.SECOND_CHUNK}=b`
    );

    removeSupabaseAuthCookies();

    expect(writes).toEqual([
      `${COOKIE_FIXTURE.FIRST_CHUNK}=; ${COOKIE_FIXTURE.EXPIRY_ATTRIBUTES}`,
      `${COOKIE_FIXTURE.SECOND_CHUNK}=; ${COOKIE_FIXTURE.EXPIRY_ATTRIBUTES}`,
    ]);
    writes.forEach((write) => {
      expect(write).toContain(COOKIE_FIXTURE.ROOT_PATH);
    });
  });

  it("expires the current family first and then the legacy one", () => {
    const legacyName = deriveLegacyAuthCookieName();
    const writes = spyOnCookieWrites(
      `${legacyName}${LEGACY_FIXTURE.FIRST_CHUNK_SUFFIX}=a; ${COOKIE_FIXTURE.NAME}=b`
    );

    removeSupabaseAuthCookies();

    expect(writes).toEqual([
      `${COOKIE_FIXTURE.NAME}=; ${COOKIE_FIXTURE.EXPIRY_ATTRIBUTES}`,
      `${legacyName}${LEGACY_FIXTURE.FIRST_CHUNK_SUFFIX}=; ${COOKIE_FIXTURE.EXPIRY_ATTRIBUTES}`,
    ]);
  });

  it("never expires a non-numeric suffix of the current name", () => {
    const writes = spyOnCookieWrites(
      `${COOKIE_FIXTURE.NON_NUMERIC_CHUNK}=a`
    );

    removeSupabaseAuthCookies();

    expect(writes).toEqual([]);
  });

  it("writes nothing when there is no auth cookie", () => {
    const writes = spyOnCookieWrites(
      `${COOKIE_FIXTURE.OTHER_PROJECT}=a; ${COOKIE_FIXTURE.SUFFIXED}=b`
    );

    removeSupabaseAuthCookies();

    expect(writes).toEqual([]);
  });
});

import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { deriveLegacyAuthCookieName } from "../deriveLegacyAuthCookieName";
import { removeLegacySupabaseAuthCookies } from "../removeLegacySupabaseAuthCookies";
import {
  COOKIE_FIXTURE,
  LEGACY_FIXTURE,
} from "./supabaseCookie.constants";

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

describe("removeLegacySupabaseAuthCookies", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("expires the legacy cookie and its chunks but never the current family", () => {
    const legacyName = deriveLegacyAuthCookieName();
    const writes = spyOnCookieWrites(
      `${legacyName}=a; ${legacyName}${LEGACY_FIXTURE.FIRST_CHUNK_SUFFIX}=b; ${COOKIE_FIXTURE.NAME}=c; ${COOKIE_FIXTURE.FIRST_CHUNK}=d`
    );

    removeLegacySupabaseAuthCookies();

    expect(writes).toEqual([
      `${legacyName}=; ${COOKIE_FIXTURE.EXPIRY_ATTRIBUTES}`,
      `${legacyName}${LEGACY_FIXTURE.FIRST_CHUNK_SUFFIX}=; ${COOKIE_FIXTURE.EXPIRY_ATTRIBUTES}`,
    ]);
  });
});

import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { expireCookieFamily } from "../expireCookieFamily";
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

describe("expireCookieFamily", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("writes one expiring root-path cookie per member of the family", () => {
    const writes = spyOnCookieWrites(
      `${LEGACY_FIXTURE.HOSTED_NAME}=a; ${LEGACY_FIXTURE.HOSTED_NAME}${LEGACY_FIXTURE.FIRST_CHUNK_SUFFIX}=b; ${LEGACY_FIXTURE.HOSTED_NAME}${LEGACY_FIXTURE.SECOND_CHUNK_SUFFIX}=c`
    );

    expireCookieFamily(LEGACY_FIXTURE.HOSTED_NAME);

    expect(writes).toEqual([
      `${LEGACY_FIXTURE.HOSTED_NAME}=; ${COOKIE_FIXTURE.EXPIRY_ATTRIBUTES}`,
      `${LEGACY_FIXTURE.HOSTED_NAME}${LEGACY_FIXTURE.FIRST_CHUNK_SUFFIX}=; ${COOKIE_FIXTURE.EXPIRY_ATTRIBUTES}`,
      `${LEGACY_FIXTURE.HOSTED_NAME}${LEGACY_FIXTURE.SECOND_CHUNK_SUFFIX}=; ${COOKIE_FIXTURE.EXPIRY_ATTRIBUTES}`,
    ]);
    writes.forEach((write) => {
      expect(write).toContain(COOKIE_FIXTURE.ROOT_PATH);
    });
  });

  it("never expires another project, a non-numeric suffix or a value that holds the name", () => {
    const writes = spyOnCookieWrites(
      `${LEGACY_FIXTURE.OTHER_PROJECT_NAME}=a; ${LEGACY_FIXTURE.HOSTED_NAME}${LEGACY_FIXTURE.NON_NUMERIC_SUFFIX}=b; theme=${LEGACY_FIXTURE.HOSTED_NAME}`
    );

    expireCookieFamily(LEGACY_FIXTURE.HOSTED_NAME);

    expect(writes).toEqual([]);
  });
});

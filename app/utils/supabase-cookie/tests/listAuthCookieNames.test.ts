import { describe, expect, it } from "vitest";
import { listAuthCookieNames } from "../listAuthCookieNames";
import { COOKIE_FIXTURE } from "./supabaseCookie.constants";

describe("listAuthCookieNames", () => {
  it("returns an empty list for an empty cookie header", () => {
    expect(
      listAuthCookieNames("", COOKIE_FIXTURE.NAME)
    ).toEqual([]);
  });

  it("matches the base name", () => {
    expect(
      listAuthCookieNames(
        `${COOKIE_FIXTURE.NAME}=a`,
        COOKIE_FIXTURE.NAME
      )
    ).toEqual([COOKIE_FIXTURE.NAME]);
  });

  it("matches every numbered chunk", () => {
    const header = `${COOKIE_FIXTURE.FIRST_CHUNK}=a; ${COOKIE_FIXTURE.SECOND_CHUNK}=b`;

    expect(
      listAuthCookieNames(header, COOKIE_FIXTURE.NAME)
    ).toEqual([
      COOKIE_FIXTURE.FIRST_CHUNK,
      COOKIE_FIXTURE.SECOND_CHUNK,
    ]);
  });

  it("tolerates spaces after the semicolons", () => {
    const header = `${COOKIE_FIXTURE.UNRELATED}=x;   ${COOKIE_FIXTURE.NAME}=a;${COOKIE_FIXTURE.FIRST_CHUNK}=b`;

    expect(
      listAuthCookieNames(header, COOKIE_FIXTURE.NAME)
    ).toEqual([
      COOKIE_FIXTURE.NAME,
      COOKIE_FIXTURE.FIRST_CHUNK,
    ]);
  });

  it("ignores the cookie of another project", () => {
    expect(
      listAuthCookieNames(
        `${COOKIE_FIXTURE.OTHER_PROJECT}=a`,
        COOKIE_FIXTURE.NAME
      )
    ).toEqual([]);
  });

  it("ignores a name that extends the auth name without a chunk separator", () => {
    expect(
      listAuthCookieNames(
        `${COOKIE_FIXTURE.SUFFIXED}=a`,
        COOKIE_FIXTURE.NAME
      )
    ).toEqual([]);
  });

  it("ignores a cookie whose value contains the auth name", () => {
    expect(
      listAuthCookieNames(
        COOKIE_FIXTURE.VALUE_CONTAINING_NAME,
        COOKIE_FIXTURE.NAME
      )
    ).toEqual([]);
  });

  it("ignores a chunk whose suffix is not numeric", () => {
    expect(
      listAuthCookieNames(
        `${COOKIE_FIXTURE.NAME}.abc=a`,
        COOKIE_FIXTURE.NAME
      )
    ).toEqual([]);
  });
});

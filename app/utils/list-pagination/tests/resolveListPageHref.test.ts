import { describe, expect, it } from "vitest";
import { PATHS } from "@/app/constants";
import { resolveListPageHref } from "../resolveListPageHref";

describe("resolveListPageHref", () => {
  it("links the first page to the list without a query", () => {
    expect(
      resolveListPageHref(
        PATHS.ADMINISTRATION.CATEGORIES,
        1
      )
    ).toBe(PATHS.ADMINISTRATION.CATEGORIES);
  });

  it("links any other page with its page number", () => {
    expect(
      resolveListPageHref(
        PATHS.ADMINISTRATION.CATEGORIES,
        3
      )
    ).toBe(`${PATHS.ADMINISTRATION.CATEGORIES}?page=3`);
  });
});

import { describe, expect, it } from "vitest";
import { PATHS } from "@/app/constants";
import { resolveCategoryListPageHref } from "../utils/resolveCategoryListPageHref";

describe("resolveCategoryListPageHref", () => {
  it("links the first page to the list without a query", () => {
    expect(resolveCategoryListPageHref(1)).toBe(
      PATHS.ADMINISTRATION.CATEGORIES
    );
  });

  it("links any other page with its page number", () => {
    expect(resolveCategoryListPageHref(3)).toBe(
      `${PATHS.ADMINISTRATION.CATEGORIES}?page=3`
    );
  });
});

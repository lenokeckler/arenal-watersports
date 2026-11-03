import { describe, expect, it } from "vitest";
import { LIST_PAGINATION } from "../constants/ListPagination.constants";
import { resolveListPageRange } from "../resolveListPageRange";

const CUSTOM_PAGE_SIZE = 10;

describe("resolveListPageRange", () => {
  it("starts the first page at the first row", () => {
    expect(
      resolveListPageRange(LIST_PAGINATION.FIRST_PAGE)
    ).toEqual({
      from: 0,
      to: LIST_PAGINATION.PAGE_SIZE - 1,
    });
  });

  it("starts the second page right after the first one", () => {
    expect(resolveListPageRange(2)).toEqual({
      from: LIST_PAGINATION.PAGE_SIZE,
      to: LIST_PAGINATION.PAGE_SIZE * 2 - 1,
    });
  });

  it("uses the page size it is given instead of the global one", () => {
    expect(
      resolveListPageRange(3, CUSTOM_PAGE_SIZE)
    ).toEqual({
      from: CUSTOM_PAGE_SIZE * 2,
      to: CUSTOM_PAGE_SIZE * 3 - 1,
    });
  });
});

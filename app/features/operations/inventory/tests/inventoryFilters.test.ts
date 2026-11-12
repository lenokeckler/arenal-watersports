import { describe, expect, it } from "vitest";
import { buildInventoryPagePath } from "../utils/buildInventoryPagePath";
import { resolveInventoryFilters } from "../utils/resolveInventoryFilters";

describe("resolveInventoryFilters", () => {
  it("keeps a trimmed query and a known mode", () => {
    expect(
      resolveInventoryFilters("  kayak ", "by_unit")
    ).toEqual({ mode: "by_unit", query: "kayak" });
  });

  it("drops an unknown mode and reads the first value of a list", () => {
    expect(
      resolveInventoryFilters(["jet", "x"], "anything")
    ).toEqual({ mode: "", query: "jet" });
  });

  it("answers empty filters when nothing is sent", () => {
    expect(
      resolveInventoryFilters(undefined, undefined)
    ).toEqual({ mode: "", query: "" });
  });

  it("cuts a very long query", () => {
    expect(
      resolveInventoryFilters("a".repeat(500), "").query
    ).toHaveLength(60);
  });
});

describe("buildInventoryPagePath", () => {
  it("keeps the filters in every page link", () => {
    const path = buildInventoryPagePath({
      mode: "by_quantity",
      query: "chal eco",
    });

    expect(path(0)).toBe(
      "/operations/inventory?q=chal+eco&mode=by_quantity"
    );
    expect(path(2)).toBe(
      "/operations/inventory?q=chal+eco&mode=by_quantity&page=2"
    );
  });

  it("links the plain list when there are no filters", () => {
    expect(
      buildInventoryPagePath({ mode: "", query: "" })(0)
    ).toBe("/operations/inventory");
  });
});

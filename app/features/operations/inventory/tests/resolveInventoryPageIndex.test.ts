import { describe, expect, it } from "vitest";
import { PAGINATION } from "@/app/constants";
import { resolveInventoryPageIndex } from "../utils/resolveInventoryPageIndex";
import {
  INVALID_INVENTORY_PAGE_PARAMETERS,
  MULTIPLE_INVENTORY_PAGE_PARAMETERS,
  VALID_INVENTORY_PAGE_INDEX,
  VALID_INVENTORY_PAGE_PARAMETER,
} from "./InventoryPageParameter.constants";

describe("resolveInventoryPageIndex", () => {
  it("uses the first valid page parameter", () => {
    expect(
      resolveInventoryPageIndex(
        MULTIPLE_INVENTORY_PAGE_PARAMETERS
      )
    ).toBe(VALID_INVENTORY_PAGE_INDEX);
  });

  it("returns the requested page for a valid parameter", () => {
    expect(
      resolveInventoryPageIndex(
        VALID_INVENTORY_PAGE_PARAMETER
      )
    ).toBe(VALID_INVENTORY_PAGE_INDEX);
  });

  it.each(
    INVALID_INVENTORY_PAGE_PARAMETERS.map(
      (pageParameter) => ({ pageParameter })
    )
  )(
    "falls back to the first page for invalid input",
    ({ pageParameter }) => {
      expect(resolveInventoryPageIndex(pageParameter)).toBe(
        PAGINATION.DEFAULT_PAGE
      );
    }
  );
});

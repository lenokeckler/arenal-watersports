import { describe, expect, it } from "vitest";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import { resolveCategoryInventoryLabel } from "../utils/resolveCategoryInventoryLabel";

describe("resolveCategoryInventoryLabel", () => {
  it("writes the plural for several categories", () => {
    expect(resolveCategoryInventoryLabel(13)).toBe(
      "Inventario registrado: 13 categorías"
    );
  });

  it("writes the singular for one category", () => {
    expect(resolveCategoryInventoryLabel(1)).toBe(
      `${CATEGORY_CATALOG_COPY.INVENTORY_COUNT_PREFIX} 1 ${CATEGORY_CATALOG_COPY.CATEGORY_COUNT_SINGULAR}`
    );
  });
});

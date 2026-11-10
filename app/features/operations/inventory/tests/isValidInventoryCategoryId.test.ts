import { describe, expect, it } from "vitest";
import { isValidInventoryCategoryId } from "../utils/isValidInventoryCategoryId";
import {
  INVALID_INVENTORY_CATEGORY_ID,
  VALID_INVENTORY_CATEGORY_ID,
} from "./InventoryCategoryId.constants";

describe("isValidInventoryCategoryId", () => {
  it("accepts a UUID category identifier", () => {
    expect(
      isValidInventoryCategoryId(
        VALID_INVENTORY_CATEGORY_ID
      )
    ).toBe(true);
  });

  it("rejects malformed category identifiers", () => {
    expect(
      isValidInventoryCategoryId(
        INVALID_INVENTORY_CATEGORY_ID
      )
    ).toBe(false);
  });
});

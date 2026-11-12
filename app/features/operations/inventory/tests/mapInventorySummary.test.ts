import { describe, expect, it } from "vitest";
import { mapInventorySummary } from "../utils/mapInventorySummary";
import {
  EXPECTED_INVENTORY_SUMMARIES,
  INVALID_INVENTORY_SUMMARY_ROW,
  INVENTORY_SUMMARY_ROWS,
  INVENTORY_UNIT_SUMMARY_ROW,
  REQUIRED_INVENTORY_SUMMARY_FIELDS,
} from "./InventorySummaryMapper.constants";

describe("mapInventorySummary", () => {
  it("maps unit and quantity categories from the database view", () => {
    const inventorySummaries = INVENTORY_SUMMARY_ROWS.map(
      mapInventorySummary
    );

    expect(inventorySummaries).toEqual(
      EXPECTED_INVENTORY_SUMMARIES
    );
  });

  it("rejects an incomplete database view row", () => {
    expect(() =>
      mapInventorySummary(INVALID_INVENTORY_SUMMARY_ROW)
    ).toThrow();
  });

  it.each(REQUIRED_INVENTORY_SUMMARY_FIELDS)(
    "rejects a missing %s without accepting a partial summary",
    (field) => {
      const incompleteSummary = {
        ...INVENTORY_UNIT_SUMMARY_ROW,
        [field]: null,
      };

      expect(() =>
        mapInventorySummary(incompleteSummary)
      ).toThrow();
    }
  );
});

import { describe, expect, it } from "vitest";
import { mapInventoryUnit } from "../utils/mapInventoryUnit";
import {
  ACTIVE_INVENTORY_UNIT_ROWS,
  DECOMMISSIONED_INVENTORY_UNIT_ROW,
  EXPECTED_MAPPED_INVENTORY_UNITS,
  INVALID_INVENTORY_UNIT_ROWS,
} from "./InventoryUnitMapper.constants";

describe("mapInventoryUnit", () => {
  it("preserves the unit code and each active status", () => {
    const inventoryUnits = ACTIVE_INVENTORY_UNIT_ROWS.map(
      mapInventoryUnit
    );

    expect(inventoryUnits).toEqual(
      EXPECTED_MAPPED_INVENTORY_UNITS
    );
  });

  it("rejects units that have been decommissioned", () => {
    expect(() =>
      mapInventoryUnit(DECOMMISSIONED_INVENTORY_UNIT_ROW)
    ).toThrow();
  });

  it.each(INVALID_INVENTORY_UNIT_ROWS)(
    "rejects units with missing identifiers or invalid statuses",
    (unitRow) => {
      expect(() => mapInventoryUnit(unitRow)).toThrow();
    }
  );
});

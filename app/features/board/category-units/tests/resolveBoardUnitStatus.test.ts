import { describe, expect, it } from "vitest";
import { INVENTORY_UNIT_STATUS } from "@/app/constants";
import { CATEGORY_UNITS_ERROR } from "../constants/CategoryUnits.constants";
import { CATEGORY_UNIT_STATUS_LABEL } from "../constants/CategoryUnitsCopy.constants";
import { resolveBoardUnitStatus } from "../utils/resolveBoardUnitStatus";
import { UNMAPPABLE_STATUSES } from "./CategoryUnits.constants";

describe("resolveBoardUnitStatus", () => {
  it.each(Object.keys(CATEGORY_UNIT_STATUS_LABEL))(
    "keeps the active status %s",
    (status) => {
      expect(resolveBoardUnitStatus(status)).toBe(status);
    }
  );

  it("accepts the fifth status, in repair", () => {
    expect(
      resolveBoardUnitStatus(
        INVENTORY_UNIT_STATUS.IN_REPAIR
      )
    ).toBe(INVENTORY_UNIT_STATUS.IN_REPAIR);
  });

  it.each(UNMAPPABLE_STATUSES)(
    "throws instead of falling back to available for %s",
    (status) => {
      expect(() => resolveBoardUnitStatus(status)).toThrow(
        CATEGORY_UNITS_ERROR.UNKNOWN_STATUS
      );
    }
  );
});

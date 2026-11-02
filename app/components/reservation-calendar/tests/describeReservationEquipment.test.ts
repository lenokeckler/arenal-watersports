import { describe, expect, it } from "vitest";
import { describeReservationEquipment } from "../utils/describeReservationEquipment";
import {
  DESCRIBED_CATEGORY_EQUIPMENT,
  DESCRIBED_EQUIPMENT_LABEL as label,
} from "./describeReservationEquipment.constants";

describe("describeReservationEquipment", () => {
  it("writes quantity and category for a category item", () => {
    expect(
      describeReservationEquipment(
        DESCRIBED_CATEGORY_EQUIPMENT
      )
    ).toBe(label.CATEGORY);
  });

  it("writes category and unit code for a concrete unit", () => {
    expect(
      describeReservationEquipment({
        ...DESCRIBED_CATEGORY_EQUIPMENT,
        unitCode: label.UNIT_CODE,
      })
    ).toBe(label.UNIT);
  });
});

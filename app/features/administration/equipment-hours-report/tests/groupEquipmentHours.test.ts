import { expect, it } from "vitest";
import { formatEquipmentHours } from "../utils/formatEquipmentHours";
import { groupEquipmentHours } from "../utils/groupEquipmentHours";
import {
  EQUIPMENT_HOURS_CATEGORIES,
  EQUIPMENT_HOURS_ROWS,
} from "./EquipmentHours.constants";

it("groups the units by category, orders the categories by name and puts the least used unit last", () => {
  expect(groupEquipmentHours(EQUIPMENT_HOURS_ROWS)).toEqual(
    EQUIPMENT_HOURS_CATEGORIES
  );
});

it("breaks a tie in hours by unit code", () => {
  const [category] = groupEquipmentHours([
    { ...EQUIPMENT_HOURS_ROWS[0], code: "B", hours: 2 },
    { ...EQUIPMENT_HOURS_ROWS[0], code: "A", hours: 2 },
  ]);

  expect(category.units.map((unit) => unit.code)).toEqual([
    "A",
    "B",
  ]);
});

it("writes the hours with one decimal at most", () => {
  expect(formatEquipmentHours(4.5)).toBe("4,5");
  expect(formatEquipmentHours(2)).toBe("2");
  expect(formatEquipmentHours(1.26)).toBe("1,3");
});

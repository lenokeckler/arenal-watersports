import { describe, expect, it } from "vitest";
import { RESERVATION_CALENDAR_ACTIVE_STATUS } from "@/app/constants";
import { RESERVATION_EDIT_QUERY } from "../constants/ReservationEditQuery.constants";
import { RESERVATION_EQUIPMENT_LOCK as lock } from "../constants/ReservationEquipmentLock.constants";
import type { ReservationEditRow } from "../models/ReservationEditRow.type";
import { mapReservationEdit } from "../utils/mapReservationEdit";
import {
  RESERVATION_EDIT_CATEGORY_ITEM as categoryItem,
  RESERVATION_EDIT_EXTRA_ITEM as extraItem,
  RESERVATION_EDIT_ROW,
  RESERVATION_EDIT_TEST as test,
  RESERVATION_EDIT_UNIT_ITEM as unitItem,
} from "./ReservationEdit.constants";

const mapRow = (overrides: Partial<ReservationEditRow>) =>
  mapReservationEdit(
    {
      ...RESERVATION_EDIT_ROW,
      ...overrides,
    },
    test.EDITOR_NAME
  );

describe("mapReservationEdit", () => {
  it("maps a category item into the form starting values", () => {
    expect(mapRow({})).toMatchObject({
      date: test.EXPECTED_DATE,
      equipment: {
        categoryId: test.CATEGORY_ID,
        quantity: test.QUANTITY,
        unitId: null,
      },
      equipmentLock: lock.NONE,
      isEditable: true,
      lastEditLabel: test.EXPECTED_LAST_EDIT,
      lastEditedAt: test.MICROSECOND_INSTANT,
      time: test.EXPECTED_TIME,
    });
  });

  it("starts from the first item by id, reading a unit's category from the unit", () => {
    const { equipment } = mapRow({
      reservation_items: [categoryItem, unitItem],
    });

    expect(equipment).toMatchObject({
      categoryId: test.CATEGORY_ID,
      unitCode: test.UNIT_CODE,
      unitId: test.UNIT_ID,
    });
  });

  it.each<[Partial<ReservationEditRow>, string]>([
    [
      { type: RESERVATION_EDIT_QUERY.COMBO_TYPE },
      lock.COMBO,
    ],
    [
      { reservation_items: [categoryItem, unitItem] },
      lock.MULTIPLE_ITEMS,
    ],
    [
      { reservation_items: [categoryItem, extraItem] },
      lock.NONE,
    ],
  ])(
    "resolves the lock of %j",
    (overrides, equipmentLock) => {
      expect(mapRow(overrides).equipmentLock).toBe(
        equipmentLock
      );
    }
  );

  it("describes every item but the extras, by id", () => {
    const { equipmentLabels } = mapRow({
      reservation_items: [
        categoryItem,
        extraItem,
        unitItem,
      ],
    });

    expect(equipmentLabels).toEqual([
      test.UNIT_LABEL,
      test.CATEGORY_LABEL,
    ]);
  });

  it.each<[Partial<ReservationEditRow>]>([
    [{ reservation_items: [extraItem] }],
    [
      {
        status:
          RESERVATION_CALENDAR_ACTIVE_STATUS.DISPATCHED,
      },
    ],
  ])("is not editable for %j", (overrides) => {
    expect(mapRow(overrides).isEditable).toBe(false);
  });
});

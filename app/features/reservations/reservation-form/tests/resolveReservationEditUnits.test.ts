import { describe, expect, it } from "vitest";
import type { ReservationEditUnitsInput } from "../models/ReservationEditUnitsInput.interface";
import { buildReservationEditFormStart } from "../utils/buildReservationEditFormStart";
import { resolveReservationEditUnits } from "../utils/resolveReservationEditUnits";
import {
  RESERVATION_EDIT,
  RESERVATION_EDIT_TEST,
} from "./ReservationEdit.constants";

const CURRENT_UNIT = {
  code: RESERVATION_EDIT_TEST.UNIT_CODE,
  id: RESERVATION_EDIT_TEST.UNIT_ID,
};
const OTHER_UNIT = {
  code: "PONTOON-2",
  id: RESERVATION_EDIT_TEST.EXTRA_ID,
};
const { values } = buildReservationEditFormStart(
  RESERVATION_EDIT
);
const MOVED_VALUES = { ...values, time: "14:00" };
const SETTLED_INPUT: ReservationEditUnitsInput = {
  availableUnits: [],
  durationHours: values.durationHours,
  isLookupSettled: true,
  reservation: RESERVATION_EDIT,
  values,
};

describe("resolveReservationEditUnits", () => {
  it("offers the current unit while the window is unchanged", () => {
    expect(
      resolveReservationEditUnits(SETTLED_INPUT)
    ).toEqual({
      isCurrentUnitKept: true,
      offeredUnits: [CURRENT_UNIT],
      retainedUnitId: CURRENT_UNIT.id,
    });
  });

  it.each([
    ["offered", [CURRENT_UNIT], CURRENT_UNIT.id],
    ["no longer offered", [OTHER_UNIT], ""],
  ])(
    "resolves a moved unit that is %s",
    (_label, availableUnits, retainedUnitId) => {
      expect(
        resolveReservationEditUnits({
          ...SETTLED_INPUT,
          availableUnits,
          values: MOVED_VALUES,
        })
      ).toEqual({
        isCurrentUnitKept: false,
        offeredUnits: availableUnits,
        retainedUnitId,
      });
    }
  );

  it("keeps the selection while the lookup is pending", () => {
    expect(
      resolveReservationEditUnits({
        ...SETTLED_INPUT,
        isLookupSettled: false,
        values: MOVED_VALUES,
      }).retainedUnitId
    ).toBe(CURRENT_UNIT.id);
  });
});

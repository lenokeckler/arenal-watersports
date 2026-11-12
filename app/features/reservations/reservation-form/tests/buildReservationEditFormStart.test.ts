import { describe, expect, it } from "vitest";
import { RESERVATION_SCHEDULE } from "../constants/ReservationSchedule.constants";
import { buildReservationEditFormStart } from "../utils/buildReservationEditFormStart";
import { getReservationDurationMinutes } from "../utils/validateReservationSchedule";
import {
  RESERVATION_EDIT,
  RESERVATION_EDIT_CATEGORY_EQUIPMENT,
  RESERVATION_EDIT_TEST,
} from "./ReservationEdit.constants";

const CUSTOM_DURATION_MINUTES = [45, 50] as const;

describe("buildReservationEditFormStart", () => {
  it("maps a unit reservation on a preset duration", () => {
    const start = buildReservationEditFormStart(
      RESERVATION_EDIT
    );

    expect(start.customDurationDraft).toBe("");
    expect(start.values).toMatchObject({
      categoryId: RESERVATION_EDIT_TEST.CATEGORY_ID,
      durationHours:
        RESERVATION_EDIT.durationMinutes /
        RESERVATION_SCHEDULE.MINUTES_PER_HOUR,
      unitId: RESERVATION_EDIT_TEST.UNIT_ID,
    });
  });

  it("maps a quantity reservation without a unit", () => {
    const { values } = buildReservationEditFormStart({
      ...RESERVATION_EDIT,
      equipment: RESERVATION_EDIT_CATEGORY_EQUIPMENT,
    });

    expect(values.quantity).toBe(
      RESERVATION_EDIT_TEST.QUANTITY
    );
    expect(values.unitId).toBe("");
  });

  it.each(CUSTOM_DURATION_MINUTES)(
    "keeps %i minutes through the custom draft",
    (durationMinutes) => {
      const { customDurationDraft } =
        buildReservationEditFormStart({
          ...RESERVATION_EDIT,
          durationMinutes,
        });

      expect(
        getReservationDurationMinutes(
          Number(customDurationDraft)
        )
      ).toBe(durationMinutes);
    }
  );
});

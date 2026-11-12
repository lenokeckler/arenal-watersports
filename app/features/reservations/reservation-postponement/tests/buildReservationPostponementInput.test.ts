import { describe, expect, it } from "vitest";
import { RESERVATION_POSTPONEMENT_CAUSE } from "../constants/ReservationPostponementCause.constants";
import { buildReservationPostponementInput } from "../utils/buildReservationPostponementInput";
import {
  COMPLETE_DISPATCHED_DRAFT,
  COMPLETE_SCHEDULED_DRAFT,
  DISPATCHED_POSTPONEMENT,
  FUEL_ITEM_ID,
  KILOMETERS_ITEM_ID,
  NEW_DATE,
  NEW_TIME,
  OTHER_REASON,
  SCHEDULED_POSTPONEMENT,
} from "./ReservationPostponementDraft.constants";

describe("buildReservationPostponementInput", () => {
  it("sends the new schedule with the stale token and no readings", () => {
    expect(
      buildReservationPostponementInput(
        SCHEDULED_POSTPONEMENT,
        COMPLETE_SCHEDULED_DRAFT,
        RESERVATION_POSTPONEMENT_CAUSE.HEAVY_RAIN
      )
    ).toEqual({
      cause: RESERVATION_POSTPONEMENT_CAUSE.HEAVY_RAIN,
      date: NEW_DATE,
      expectedUpdatedAt:
        SCHEDULED_POSTPONEMENT.expectedUpdatedAt,
      readings: [],
      reason: "",
      reservationId: SCHEDULED_POSTPONEMENT.id,
      time: NEW_TIME,
    });
  });

  it("drops a reason typed before switching to a weather cause", () => {
    expect(
      buildReservationPostponementInput(
        SCHEDULED_POSTPONEMENT,
        {
          ...COMPLETE_SCHEDULED_DRAFT,
          reason: OTHER_REASON,
        },
        RESERVATION_POSTPONEMENT_CAUSE.STORM
      ).reason
    ).toBe("");
  });

  it("trims the reason of another cause", () => {
    expect(
      buildReservationPostponementInput(
        SCHEDULED_POSTPONEMENT,
        {
          ...COMPLETE_SCHEDULED_DRAFT,
          reason: `  ${OTHER_REASON} `,
        },
        RESERVATION_POSTPONEMENT_CAUSE.OTHER
      ).reason
    ).toBe(OTHER_REASON);
  });

  it("parses the readings and sends null where the unit has no meter", () => {
    expect(
      buildReservationPostponementInput(
        DISPATCHED_POSTPONEMENT,
        COMPLETE_DISPATCHED_DRAFT,
        RESERVATION_POSTPONEMENT_CAUSE.STORM
      ).readings
    ).toEqual([
      { fuelIn: 3, itemId: FUEL_ITEM_ID, usageIn: 1250.5 },
      {
        fuelIn: null,
        itemId: KILOMETERS_ITEM_ID,
        usageIn: 8120,
      },
    ]);
  });
});

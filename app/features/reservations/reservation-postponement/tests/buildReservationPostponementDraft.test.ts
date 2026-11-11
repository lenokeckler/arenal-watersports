import { describe, expect, it } from "vitest";
import { buildReservationPostponementDraft } from "../utils/buildReservationPostponementDraft";
import { listReservationPostponementCauses } from "../utils/listReservationPostponementCauses";
import { RESERVATION_POSTPONEMENT_CAUSE } from "../constants/ReservationPostponementCause.constants";
import {
  DISPATCHED_POSTPONEMENT,
  EMPTY_READING,
  FUEL_ITEM_ID,
  KILOMETERS_ITEM_ID,
  SCHEDULED_POSTPONEMENT,
} from "./ReservationPostponementDraft.constants";

describe("buildReservationPostponementDraft", () => {
  it("starts from the current date and time with no cause chosen", () => {
    expect(
      buildReservationPostponementDraft(
        SCHEDULED_POSTPONEMENT
      )
    ).toEqual({
      cause: null,
      date: SCHEDULED_POSTPONEMENT.date,
      readings: {},
      reason: "",
      time: SCHEDULED_POSTPONEMENT.time,
    });
  });

  it("leaves every reading of a dispatched unit empty", () => {
    expect(
      buildReservationPostponementDraft(
        DISPATCHED_POSTPONEMENT
      ).readings
    ).toEqual({
      [FUEL_ITEM_ID]: EMPTY_READING,
      [KILOMETERS_ITEM_ID]: EMPTY_READING,
    });
  });
});

describe("listReservationPostponementCauses", () => {
  it("offers every cause for a scheduled reservation", () => {
    expect(
      listReservationPostponementCauses(false)
    ).toEqual([
      RESERVATION_POSTPONEMENT_CAUSE.HEAVY_RAIN,
      RESERVATION_POSTPONEMENT_CAUSE.STORM,
      RESERVATION_POSTPONEMENT_CAUSE.OTHER,
    ]);
  });

  it("offers only the weather causes for a dispatched reservation", () => {
    expect(listReservationPostponementCauses(true)).toEqual(
      [
        RESERVATION_POSTPONEMENT_CAUSE.HEAVY_RAIN,
        RESERVATION_POSTPONEMENT_CAUSE.STORM,
      ]
    );
  });
});

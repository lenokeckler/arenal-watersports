import { describe, expect, it } from "vitest";
import { mapReservationCharge } from "../utils/mapReservationCharge";
import {
  BOTH_PROPOSAL,
  CHARGE_PARENT_RESERVATION_ID,
  EXPECTED_SCHEDULED,
  FIRST_MINUTE_OF_COSTA_RICA_DAY_ROW,
  LAST_MINUTE_OF_COSTA_RICA_DAY_ROW,
  UTC_MIDNIGHT_ROW,
  UTC_NEW_YEAR_ROW,
  SCHEDULED_ROW,
  SPLIT_CHILD_ROW,
} from "./ReservationCharge.constants";

describe("mapReservationCharge", () => {
  it("maps the reservation with its Costa Rica date and time and the proposal", () => {
    expect(
      mapReservationCharge(SCHEDULED_ROW, BOTH_PROPOSAL)
    ).toEqual(EXPECTED_SCHEDULED);
  });

  it("keeps the parent of a split child", () => {
    expect(
      mapReservationCharge(SPLIT_CHILD_ROW, BOTH_PROPOSAL)
        .parentReservationId
    ).toBe(CHARGE_PARENT_RESERVATION_ID);
  });

  it("keeps the previous Costa Rica day at 23:59 when UTC is already the next day", () => {
    const mapped = mapReservationCharge(
      LAST_MINUTE_OF_COSTA_RICA_DAY_ROW,
      BOTH_PROPOSAL
    );

    expect([mapped.date, mapped.time]).toEqual([
      "2026-11-02",
      "23:59",
    ]);
  });

  it("starts the next Costa Rica day at 06:00 UTC", () => {
    const mapped = mapReservationCharge(
      FIRST_MINUTE_OF_COSTA_RICA_DAY_ROW,
      BOTH_PROPOSAL
    );

    expect([mapped.date, mapped.time]).toEqual([
      "2026-11-03",
      "00:00",
    ]);
  });

  it("maps UTC midnight to the evening of the previous Costa Rica day", () => {
    const mapped = mapReservationCharge(
      UTC_MIDNIGHT_ROW,
      BOTH_PROPOSAL
    );

    expect([mapped.date, mapped.time]).toEqual([
      "2026-11-02",
      "18:00",
    ]);
  });

  it("maps the first hours of a UTC year to the last day of the previous year", () => {
    const mapped = mapReservationCharge(
      UTC_NEW_YEAR_ROW,
      BOTH_PROPOSAL
    );

    expect([mapped.date, mapped.time]).toEqual([
      "2026-12-31",
      "21:30",
    ]);
  });
});

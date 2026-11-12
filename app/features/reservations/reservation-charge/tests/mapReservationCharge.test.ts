import { describe, expect, it } from "vitest";
import { mapReservationCharge } from "../utils/mapReservationCharge";
import {
  BOTH_PROPOSAL,
  CHARGE_PARENT_RESERVATION_ID,
  EXPECTED_SCHEDULED,
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
});

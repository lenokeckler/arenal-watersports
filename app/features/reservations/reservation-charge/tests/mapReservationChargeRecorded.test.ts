import { describe, expect, it } from "vitest";
import { mapReservationChargeRecorded } from "../utils/mapReservationChargeRecorded";
import {
  CHARGE_RECORD_ROW,
  CHARGE_RECORDED,
} from "./ReservationChargeAction.constants";

describe("mapReservationChargeRecorded", () => {
  it("maps the database row to the recorded charge", () => {
    expect(
      mapReservationChargeRecorded(CHARGE_RECORD_ROW)
    ).toEqual(CHARGE_RECORDED);
  });
});

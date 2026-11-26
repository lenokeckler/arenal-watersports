import { describe, expect, it } from "vitest";
import { mapReservationChargeRecorded } from "../utils/mapReservationChargeRecorded";
import { CHARGE_RECORD_ROW } from "./ReservationChargeAction.constants";
import {
  CRC_FIRST_ROWS,
  MIXED_RECORDED,
} from "./ReservationChargeRecordedParts.constants";

describe("mapReservationChargeRecorded parts", () => {
  it("maps one row to one part", () => {
    expect(
      mapReservationChargeRecorded([CHARGE_RECORD_ROW])
        .parts
    ).toHaveLength(1);
  });

  it("maps two rows to two parts in the returned order", () => {
    expect(
      mapReservationChargeRecorded(CRC_FIRST_ROWS)
    ).toEqual(MIXED_RECORDED);
  });
});

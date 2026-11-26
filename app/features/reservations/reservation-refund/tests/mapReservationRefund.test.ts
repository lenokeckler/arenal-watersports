import { describe, expect, it } from "vitest";
import { mapReservationRefund } from "../utils/mapReservationRefund";
import { mapReservationRefundableNet } from "../utils/mapReservationRefundableNet";
import {
  BEFORE_COSTA_RICA_MIDNIGHT_ROW,
  CRC_FIRST_NET_ROWS,
  EXPECTED_CRC_FIRST,
  EXPECTED_PREVIOUS_DAY,
  SPLIT_CHILD_ROW,
  SPLIT_PARENT_ID,
} from "./ReservationRefund.constants";

describe("mapReservationRefundableNet", () => {
  it("returns an empty list for no rows", () => {
    expect(mapReservationRefundableNet([])).toEqual([]);
  });

  it("keeps the order of the rows it receives", () => {
    expect(
      mapReservationRefundableNet(CRC_FIRST_NET_ROWS)
    ).toEqual(EXPECTED_CRC_FIRST);
  });
});

describe("mapReservationRefund", () => {
  it("keeps the parent of a split child", () => {
    expect(
      mapReservationRefund(SPLIT_CHILD_ROW, [])
        .parentReservationId
    ).toBe(SPLIT_PARENT_ID);
  });

  it("dates the reservation in Costa Rica time across UTC midnight", () => {
    expect(
      mapReservationRefund(
        BEFORE_COSTA_RICA_MIDNIGHT_ROW,
        []
      )
    ).toMatchObject(EXPECTED_PREVIOUS_DAY);
  });
});

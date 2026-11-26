import { describe, expect, it } from "vitest";
import {
  RESERVATION_DETAIL_CURRENCY,
  RESERVATION_DETAIL_MOVEMENT_TYPE,
} from "../constants/ReservationDetail.constants";
import { mapReservationDetailRefundMovement } from "../utils/mapReservationDetailRefundMovement";
import { RESERVATION_DETAIL_MOVEMENTS_TEST as movement } from "./ReservationDetailMoneyMovementsTest.constants";
import { createReservationDetailRefundSource } from "./createReservationDetailRefundSource";

const WORKER_NAMES = [
  {
    full_name: movement.REFUND_WORKER_NAME,
    worker_id: movement.REFUND_WORKER_ID,
  },
];

describe("mapReservationDetailRefundMovement", () => {
  it("maps a refund with its reason and no payment method", () => {
    expect(
      mapReservationDetailRefundMovement(
        createReservationDetailRefundSource(),
        WORKER_NAMES
      )
    ).toEqual({
      amount: movement.REFUND_AMOUNT,
      concept: movement.REFUND_REASON,
      createdAt: movement.REFUND_TIMESTAMP,
      currency: RESERVATION_DETAIL_CURRENCY.CRC,
      id: movement.REFUND_ID,
      paymentMethod: null,
      recordedByName: movement.REFUND_WORKER_NAME,
      type: RESERVATION_DETAIL_MOVEMENT_TYPE.REFUND,
    });
  });

  it("keeps the refund currency", () => {
    expect(
      mapReservationDetailRefundMovement(
        createReservationDetailRefundSource({
          currency: RESERVATION_DETAIL_CURRENCY.USD,
        }),
        WORKER_NAMES
      ).currency
    ).toBe(RESERVATION_DETAIL_CURRENCY.USD);
  });

  it("leaves the recorder empty when the worker name is unknown", () => {
    expect(
      mapReservationDetailRefundMovement(
        createReservationDetailRefundSource({
          created_by: movement.UNKNOWN_WORKER_ID,
        }),
        WORKER_NAMES
      ).recordedByName
    ).toBeNull();
  });
});

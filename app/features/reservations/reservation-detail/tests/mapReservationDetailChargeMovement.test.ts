import { describe, expect, it } from "vitest";
import {
  RESERVATION_DETAIL_CHARGE_KIND,
  RESERVATION_DETAIL_CURRENCY,
  RESERVATION_DETAIL_MOVEMENT_TYPE,
} from "../constants/ReservationDetail.constants";
import { RESERVATION_DETAIL_MOVEMENTS_COPY } from "../constants/ReservationDetailMovementsCopy.constants";
import { mapReservationDetailChargeMovement } from "../utils/mapReservationDetailChargeMovement";
import { RESERVATION_DETAIL_MOVEMENTS_TEST as movement } from "./ReservationDetailMoneyMovementsTest.constants";
import { createReservationDetailChargeSource } from "./createReservationDetailChargeSource";

const WORKER_NAMES = [
  {
    full_name: movement.CHARGE_WORKER_NAME,
    worker_id: movement.CHARGE_WORKER_ID,
  },
];

describe("mapReservationDetailChargeMovement", () => {
  it("maps a charge with its kind concept and payment method", () => {
    expect(
      mapReservationDetailChargeMovement(
        createReservationDetailChargeSource(),
        WORKER_NAMES
      )
    ).toEqual({
      amount: movement.CHARGE_AMOUNT,
      concept:
        RESERVATION_DETAIL_MOVEMENTS_COPY.TARIFF_CONCEPT,
      createdAt: movement.CHARGE_TIMESTAMP,
      currency: RESERVATION_DETAIL_CURRENCY.CRC,
      id: movement.CHARGE_ID,
      paymentMethod: movement.CHARGE_METHOD,
      recordedByName: movement.CHARGE_WORKER_NAME,
      type: RESERVATION_DETAIL_MOVEMENT_TYPE.CHARGE,
    });
  });

  it("uses the extra time concept for extra time charges", () => {
    expect(
      mapReservationDetailChargeMovement(
        createReservationDetailChargeSource({
          kind: RESERVATION_DETAIL_CHARGE_KIND.EXTRA_TIME,
        }),
        WORKER_NAMES
      ).concept
    ).toBe(
      RESERVATION_DETAIL_MOVEMENTS_COPY.EXTRA_TIME_CONCEPT
    );
  });

  it("leaves the recorder empty when the worker name is unknown", () => {
    expect(
      mapReservationDetailChargeMovement(
        createReservationDetailChargeSource({
          created_by: movement.UNKNOWN_WORKER_ID,
        }),
        WORKER_NAMES
      ).recordedByName
    ).toBeNull();
  });
});

import { describe, expect, it } from "vitest";
import {
  RESERVATION_DETAIL_CURRENCY,
  RESERVATION_DETAIL_MOVEMENT_TYPE,
} from "../constants/ReservationDetail.constants";
import type { ReservationDetailMoneyMovement } from "../models/ReservationDetailMoneyMovement.interface";
import { compareReservationDetailMoneyMovements } from "../utils/compareReservationDetailMoneyMovements";
import { RESERVATION_DETAIL_MOVEMENTS_TEST as movement } from "./ReservationDetailMoneyMovementsTest.constants";

const createMovement = (
  overrides: Partial<ReservationDetailMoneyMovement>
): ReservationDetailMoneyMovement => ({
  amount: movement.CHARGE_AMOUNT,
  concept: movement.REFUND_REASON,
  createdAt: movement.CHARGE_TIMESTAMP,
  currency: RESERVATION_DETAIL_CURRENCY.CRC,
  id: movement.CHARGE_ID,
  paymentMethod: null,
  recordedByName: null,
  type: RESERVATION_DETAIL_MOVEMENT_TYPE.CHARGE,
  ...overrides,
});

describe("compareReservationDetailMoneyMovements", () => {
  it("places the newest movement first", () => {
    const older = createMovement({
      createdAt: movement.EARLIER_TIMESTAMP,
    });
    const newer = createMovement({
      createdAt: movement.REFUND_TIMESTAMP,
    });

    expect(
      [older, newer].sort(
        compareReservationDetailMoneyMovements
      )
    ).toEqual([newer, older]);
  });

  it("orders equal instants by id descending", () => {
    const lower = createMovement({ id: movement.LOWER_ID });
    const higher = createMovement({
      id: movement.HIGHER_ID,
    });

    expect(
      [lower, higher].sort(
        compareReservationDetailMoneyMovements
      )
    ).toEqual([higher, lower]);
    expect(
      [higher, lower].sort(
        compareReservationDetailMoneyMovements
      )
    ).toEqual([higher, lower]);
  });
});

import { describe, expect, it } from "vitest";
import { mapReservationDetailMoneyMovements } from "../utils/mapReservationDetailMoneyMovements";
import { RESERVATION_DETAIL_MOVEMENTS_TEST as movement } from "./ReservationDetailMoneyMovementsTest.constants";
import { RESERVATION_DETAIL_SOURCE_FIXTURE } from "./ReservationDetailSourceFixture.constants";
import { createReservationDetailChargeSource } from "./createReservationDetailChargeSource";
import { createReservationDetailRefundSource } from "./createReservationDetailRefundSource";

const WORKER_NAMES = [
  {
    full_name: movement.CHARGE_WORKER_NAME,
    worker_id: movement.CHARGE_WORKER_ID,
  },
  {
    full_name: movement.REFUND_WORKER_NAME,
    worker_id: movement.REFUND_WORKER_ID,
  },
];

describe("mapReservationDetailMoneyMovements", () => {
  it("merges charges and refunds newest first", () => {
    const movements = mapReservationDetailMoneyMovements(
      {
        ...RESERVATION_DETAIL_SOURCE_FIXTURE,
        refunds: [createReservationDetailRefundSource()],
        reservation_charges: [
          createReservationDetailChargeSource(),
        ],
      },
      WORKER_NAMES
    );

    expect(movements.map(({ id }) => id)).toEqual([
      movement.REFUND_ID,
      movement.CHARGE_ID,
    ]);
  });

  it("returns an empty list without charges or refunds", () => {
    expect(
      mapReservationDetailMoneyMovements(
        {
          ...RESERVATION_DETAIL_SOURCE_FIXTURE,
          refunds: [],
          reservation_charges: [],
        },
        WORKER_NAMES
      )
    ).toEqual([]);
  });

  it("sorts a large list newest first without losing movements", () => {
    const charges = Array.from(
      { length: movement.LARGE_LIST_SIZE },
      (_, index) =>
        createReservationDetailChargeSource({
          created_at: new Date(
            Date.parse(movement.EARLIER_TIMESTAMP) +
              index * 1000
          ).toISOString(),
          id: `charge-${index}`,
        })
    );

    const movements = mapReservationDetailMoneyMovements(
      {
        ...RESERVATION_DETAIL_SOURCE_FIXTURE,
        refunds: [],
        reservation_charges: charges,
      },
      WORKER_NAMES
    );

    expect(movements.map(({ id }) => id)).toEqual(
      charges.map(({ id }) => id).reverse()
    );
  });
});

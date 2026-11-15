import { describe, expect, it } from "vitest";
import {
  RESERVATION_DETAIL_CHARGE_KIND,
  RESERVATION_DETAIL_CURRENCY,
  RESERVATION_DETAIL_MOVEMENT_TYPE,
} from "../constants/ReservationDetail.constants";
import { RESERVATION_DETAIL_MOVEMENTS_COPY } from "../constants/ReservationDetailMovementsCopy.constants";
import { mapReservationDetailMoneyMovements } from "../utils/mapReservationDetailMoneyMovements";
import { RESERVATION_DETAIL_MOVEMENTS_TEST as movement } from "./ReservationDetailMoneyMovementsTest.constants";
import { RESERVATION_DETAIL_SOURCE_FIXTURE } from "./ReservationDetailSourceFixture.constants";
import {
  createChargeSource,
  createRefundSource,
} from "./createReservationDetailMoneyMovementSource";

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
  it("maps a charge with its kind concept and payment method", () => {
    const movements = mapReservationDetailMoneyMovements(
      {
        ...RESERVATION_DETAIL_SOURCE_FIXTURE,
        refunds: [],
        reservation_charges: [createChargeSource()],
      },
      WORKER_NAMES
    );

    expect(movements).toEqual([
      {
        amount: movement.CHARGE_AMOUNT,
        concept:
          RESERVATION_DETAIL_MOVEMENTS_COPY.TARIFF_CONCEPT,
        createdAt: movement.CHARGE_TIMESTAMP,
        currency: RESERVATION_DETAIL_CURRENCY.CRC,
        id: movement.CHARGE_ID,
        paymentMethod: movement.CHARGE_METHOD,
        recordedByName: movement.CHARGE_WORKER_NAME,
        type: RESERVATION_DETAIL_MOVEMENT_TYPE.CHARGE,
      },
    ]);
  });

  it("uses the extra time copy for extra time charges", () => {
    const [charge] = mapReservationDetailMoneyMovements(
      {
        ...RESERVATION_DETAIL_SOURCE_FIXTURE,
        refunds: [],
        reservation_charges: [
          createChargeSource({
            kind: RESERVATION_DETAIL_CHARGE_KIND.EXTRA_TIME,
          }),
        ],
      },
      WORKER_NAMES
    );

    expect(charge.concept).toBe(
      RESERVATION_DETAIL_MOVEMENTS_COPY.EXTRA_TIME_CONCEPT
    );
  });

  it("maps a refund with its reason and no payment method", () => {
    const [refund] = mapReservationDetailMoneyMovements(
      {
        ...RESERVATION_DETAIL_SOURCE_FIXTURE,
        refunds: [createRefundSource()],
        reservation_charges: [],
      },
      WORKER_NAMES
    );

    expect(refund).toEqual({
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

  it("merges charges and refunds newest first", () => {
    const movements = mapReservationDetailMoneyMovements(
      {
        ...RESERVATION_DETAIL_SOURCE_FIXTURE,
        refunds: [createRefundSource()],
        reservation_charges: [createChargeSource()],
      },
      WORKER_NAMES
    );

    expect(movements.map(({ id }) => id)).toEqual([
      movement.REFUND_ID,
      movement.CHARGE_ID,
    ]);
  });

  it("keeps each movement in its own currency and amount", () => {
    const movements = mapReservationDetailMoneyMovements(
      {
        ...RESERVATION_DETAIL_SOURCE_FIXTURE,
        refunds: [
          createRefundSource({
            currency: RESERVATION_DETAIL_CURRENCY.USD,
          }),
        ],
        reservation_charges: [createChargeSource()],
      },
      WORKER_NAMES
    );

    expect(
      movements.map(({ amount, currency }) => [
        amount,
        currency,
      ])
    ).toEqual([
      [
        movement.REFUND_AMOUNT,
        RESERVATION_DETAIL_CURRENCY.USD,
      ],
      [
        movement.CHARGE_AMOUNT,
        RESERVATION_DETAIL_CURRENCY.CRC,
      ],
    ]);
  });

  it("leaves the recorder empty when the worker name is unknown", () => {
    const [charge] = mapReservationDetailMoneyMovements(
      {
        ...RESERVATION_DETAIL_SOURCE_FIXTURE,
        refunds: [],
        reservation_charges: [
          createChargeSource({
            created_by: movement.UNKNOWN_WORKER_ID,
          }),
        ],
      },
      WORKER_NAMES
    );

    expect(charge.recordedByName).toBeNull();
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

  it("keeps a refund that has no charges", () => {
    const movements = mapReservationDetailMoneyMovements(
      {
        ...RESERVATION_DETAIL_SOURCE_FIXTURE,
        refunds: [createRefundSource()],
        reservation_charges: [],
      },
      []
    );

    expect(movements.map(({ id }) => id)).toEqual([
      movement.REFUND_ID,
    ]);
  });

  it("orders a charge and a refund sharing an instant by id descending", () => {
    const movements = mapReservationDetailMoneyMovements(
      {
        ...RESERVATION_DETAIL_SOURCE_FIXTURE,
        refunds: [
          createRefundSource({
            created_at: movement.CHARGE_TIMESTAMP,
            id: movement.LOWER_ID,
          }),
        ],
        reservation_charges: [
          createChargeSource({ id: movement.HIGHER_ID }),
        ],
      },
      WORKER_NAMES
    );

    expect(movements.map(({ id }) => id)).toEqual([
      movement.HIGHER_ID,
      movement.LOWER_ID,
    ]);
  });

  it("orders movements by instant when timestamps use different offsets", () => {
    const movements = mapReservationDetailMoneyMovements(
      {
        ...RESERVATION_DETAIL_SOURCE_FIXTURE,
        refunds: [
          createRefundSource({
            created_at: movement.OFFSET_EARLIER_TIMESTAMP,
          }),
        ],
        reservation_charges: [
          createChargeSource({
            created_at: movement.OFFSET_LATER_TIMESTAMP,
          }),
        ],
      },
      WORKER_NAMES
    );

    expect(movements.map(({ id }) => id)).toEqual([
      movement.CHARGE_ID,
      movement.REFUND_ID,
    ]);
  });

  it("sorts a large list newest first without losing movements", () => {
    const charges = Array.from(
      { length: movement.LARGE_LIST_SIZE },
      (_, index) =>
        createChargeSource({
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

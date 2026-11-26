import { describe, expect, it } from "vitest";
import { collectReservationDetailWorkerIds } from "../utils/collectReservationDetailWorkerIds";
import { RESERVATION_DETAIL_MOVEMENTS_TEST as movement } from "./ReservationDetailMoneyMovementsTest.constants";
import { RESERVATION_DETAIL_SOURCE_FIXTURE } from "./ReservationDetailSourceFixture.constants";
import { RESERVATION_DETAIL_TEST } from "./ReservationDetailTest.constants";
import { createReservationDetailChargeSource } from "./createReservationDetailChargeSource";
import { createReservationDetailRefundSource } from "./createReservationDetailRefundSource";

describe("collectReservationDetailWorkerIds", () => {
  it("lists reservation, guide, charge and refund creators in order", () => {
    const workerIds = collectReservationDetailWorkerIds({
      ...RESERVATION_DETAIL_SOURCE_FIXTURE,
      refunds: [createReservationDetailRefundSource()],
    });

    expect(workerIds).toEqual([
      RESERVATION_DETAIL_TEST.CREATED_WORKER_ID,
      RESERVATION_DETAIL_TEST.UPDATED_WORKER_ID,
      RESERVATION_DETAIL_TEST.GUIDE_WORKER_ID,
      movement.CHARGE_WORKER_ID,
      movement.REFUND_WORKER_ID,
    ]);
  });

  it("lists a worker once when the same worker recorded several records", () => {
    const workerIds = collectReservationDetailWorkerIds({
      ...RESERVATION_DETAIL_SOURCE_FIXTURE,
      refunds: [
        createReservationDetailRefundSource({
          created_by:
            RESERVATION_DETAIL_TEST.CREATED_WORKER_ID,
        }),
      ],
      reservation_charges: [
        createReservationDetailChargeSource({
          created_by:
            RESERVATION_DETAIL_TEST.CREATED_WORKER_ID,
        }),
        createReservationDetailChargeSource({
          created_by:
            RESERVATION_DETAIL_TEST.CREATED_WORKER_ID,
        }),
      ],
    });

    expect(workerIds).toEqual([
      RESERVATION_DETAIL_TEST.CREATED_WORKER_ID,
      RESERVATION_DETAIL_TEST.UPDATED_WORKER_ID,
      RESERVATION_DETAIL_TEST.GUIDE_WORKER_ID,
    ]);
  });

  it("lists only reservation and guide workers when there are no movements", () => {
    const workerIds = collectReservationDetailWorkerIds({
      ...RESERVATION_DETAIL_SOURCE_FIXTURE,
      reservation_charges: [],
    });

    expect(workerIds).toEqual([
      RESERVATION_DETAIL_TEST.CREATED_WORKER_ID,
      RESERVATION_DETAIL_TEST.UPDATED_WORKER_ID,
      RESERVATION_DETAIL_TEST.GUIDE_WORKER_ID,
    ]);
  });
});

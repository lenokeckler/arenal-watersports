import { describe, expect, it } from "vitest";
import { mapReservationDetail } from "../utils/mapReservationDetail";
import {
  RESERVATION_DETAIL_TEST,
  RESERVATION_DETAIL_WORKER_NAMES_FIXTURE,
} from "./ReservationDetailTest.constants";
import { RESERVATION_DETAIL_SOURCE_FIXTURE } from "./ReservationDetailSourceFixture.constants";

describe("mapReservationDetail", () => {
  it("projects equipment, extras, guides, audit names, and dispatch timestamps", () => {
    const detail = mapReservationDetail(
      RESERVATION_DETAIL_SOURCE_FIXTURE,
      RESERVATION_DETAIL_WORKER_NAMES_FIXTURE
    );

    expect(detail.equipment).toEqual([
      {
        categoryName: RESERVATION_DETAIL_TEST.CATEGORY_NAME,
        dispatchId: RESERVATION_DETAIL_TEST.RESERVATION_ID,
        quantity: null,
        unitCode: RESERVATION_DETAIL_TEST.UNIT_CODE,
      },
      {
        categoryName: RESERVATION_DETAIL_TEST.CATEGORY_NAME,
        dispatchId: null,
        quantity: RESERVATION_DETAIL_TEST.QUANTITY,
        unitCode: null,
      },
    ]);
    expect(detail.extras).toEqual([
      {
        categoryName: RESERVATION_DETAIL_TEST.CATEGORY_NAME,
        name: RESERVATION_DETAIL_TEST.EXTRA_NAME,
        quantity: RESERVATION_DETAIL_TEST.QUANTITY,
      },
    ]);
    expect(detail.guides).toEqual([
      RESERVATION_DETAIL_TEST.GUIDE_NAME,
    ]);
    expect(detail.createdByName).toBe(
      RESERVATION_DETAIL_TEST.WORKER_NAME
    );
    expect(detail.updatedByName).toBe(
      RESERVATION_DETAIL_TEST.WORKER_NAME
    );
    expect(detail.dispatches).toEqual([
      {
        actualArrivalAt:
          RESERVATION_DETAIL_TEST.ACTUAL_ARRIVAL,
        actualDepartureAt:
          RESERVATION_DETAIL_TEST.ACTUAL_DEPARTURE,
        categoryName: RESERVATION_DETAIL_TEST.CATEGORY_NAME,
        expectedReturnAt:
          RESERVATION_DETAIL_TEST.EXPECTED_RETURN,
        id: RESERVATION_DETAIL_TEST.RESERVATION_ID,
      },
    ]);
  });

  it("uses the unavailable-name fallback for unresolved extra relations", () => {
    const source = {
      ...RESERVATION_DETAIL_SOURCE_FIXTURE,
      reservation_items:
        RESERVATION_DETAIL_SOURCE_FIXTURE.reservation_items.map(
          (item) =>
            item.extra_id === null
              ? item
              : { ...item, extra: null }
        ),
    };
    const detail = mapReservationDetail(
      source,
      RESERVATION_DETAIL_WORKER_NAMES_FIXTURE
    );

    expect(detail.extras).toEqual([
      {
        categoryName: RESERVATION_DETAIL_TEST.CATEGORY_NAME,
        name: RESERVATION_DETAIL_TEST.MISSING_RELATED_NAME,
        quantity: RESERVATION_DETAIL_TEST.QUANTITY,
      },
    ]);
  });

  it("uses the unavailable-name fallback for unresolved guides", () => {
    const workerNames =
      RESERVATION_DETAIL_WORKER_NAMES_FIXTURE.filter(
        (worker) =>
          worker.worker_id !==
          RESERVATION_DETAIL_TEST.GUIDE_WORKER_ID
      );
    const detail = mapReservationDetail(
      RESERVATION_DETAIL_SOURCE_FIXTURE,
      workerNames
    );

    expect(detail.guides).toEqual([
      RESERVATION_DETAIL_TEST.MISSING_RELATED_NAME,
    ]);
  });

  it("keeps an open dispatch without an actual arrival", () => {
    const [dispatch] =
      RESERVATION_DETAIL_SOURCE_FIXTURE.reservation_dispatches;
    const detail = mapReservationDetail(
      {
        ...RESERVATION_DETAIL_SOURCE_FIXTURE,
        reservation_dispatches: [
          { ...dispatch, closed_at: null },
        ],
      },
      RESERVATION_DETAIL_WORKER_NAMES_FIXTURE
    );

    expect(detail.dispatches[0].actualArrivalAt).toBeNull();
    expect(detail.dispatches[0].expectedReturnAt).toBe(
      RESERVATION_DETAIL_TEST.EXPECTED_RETURN
    );
  });
});

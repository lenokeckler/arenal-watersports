import { describe, expect, it } from "vitest";
import { mapReservationDetail } from "../utils/mapReservationDetail";
import {
  RESERVATION_DETAIL_TEST as test,
  RESERVATION_DETAIL_WORKER_NAMES_FIXTURE,
} from "./ReservationDetailTest.constants";
import { RESERVATION_DETAIL_SOURCE_FIXTURE } from "./ReservationDetailSourceFixture.constants";

describe("mapReservationDetail", () => {
  it("maps unit codes to their dispatched group", () => {
    const detail = mapReservationDetail(
      RESERVATION_DETAIL_SOURCE_FIXTURE,
      RESERVATION_DETAIL_WORKER_NAMES_FIXTURE
    );

    expect(detail.dispatches[0].unitCodes).toEqual([
      test.UNIT_CODE,
    ]);
  });

  it("maps committed equipment", () => {
    const detail = mapReservationDetail(
      RESERVATION_DETAIL_SOURCE_FIXTURE,
      RESERVATION_DETAIL_WORKER_NAMES_FIXTURE
    );

    expect(detail.equipment).toEqual([
      {
        categoryName: test.CATEGORY_NAME,
        quantity: null,
        unitCode: test.UNIT_CODE,
      },
      {
        categoryName: test.CATEGORY_NAME,
        quantity: test.QUANTITY,
        unitCode: null,
      },
    ]);
  });

  it("maps extras and guide identity", () => {
    const detail = mapReservationDetail(
      RESERVATION_DETAIL_SOURCE_FIXTURE,
      RESERVATION_DETAIL_WORKER_NAMES_FIXTURE
    );

    expect(detail.extras).toEqual([
      {
        categoryName: test.CATEGORY_NAME,
        name: test.EXTRA_NAME,
        quantity: test.QUANTITY,
      },
    ]);
    expect(detail.guides).toEqual([
      {
        name: test.GUIDE_NAME,
        workerId: test.GUIDE_WORKER_ID,
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
        categoryName: test.CATEGORY_NAME,
        name: test.MISSING_RELATED_NAME,
        quantity: test.QUANTITY,
      },
    ]);
  });

  it("preserves distinct guide identities for matching names", () => {
    const detail = mapReservationDetail(
      {
        ...RESERVATION_DETAIL_SOURCE_FIXTURE,
        reservation_guides: [
          { worker_id: test.GUIDE_WORKER_ID },
          { worker_id: test.SECOND_GUIDE_WORKER_ID },
        ],
      },
      [
        ...RESERVATION_DETAIL_WORKER_NAMES_FIXTURE,
        {
          full_name: test.GUIDE_NAME,
          worker_id: test.SECOND_GUIDE_WORKER_ID,
        },
      ]
    );

    expect(detail.guides).toEqual([
      {
        name: test.GUIDE_NAME,
        workerId: test.GUIDE_WORKER_ID,
      },
      {
        name: test.GUIDE_NAME,
        workerId: test.SECOND_GUIDE_WORKER_ID,
      },
    ]);
  });

  it("maps creator and modifier names", () => {
    const detail = mapReservationDetail(
      RESERVATION_DETAIL_SOURCE_FIXTURE,
      RESERVATION_DETAIL_WORKER_NAMES_FIXTURE
    );

    expect(detail.createdByName).toBe(
      test.CREATED_WORKER_NAME
    );
    expect(detail.updatedByName).toBe(
      test.UPDATED_WORKER_NAME
    );
  });

  it("maps dispatch timestamps", () => {
    const detail = mapReservationDetail(
      RESERVATION_DETAIL_SOURCE_FIXTURE,
      RESERVATION_DETAIL_WORKER_NAMES_FIXTURE
    );

    expect(detail.dispatches).toEqual([
      {
        actualArrivalAt: test.ACTUAL_ARRIVAL,
        actualDepartureAt: test.ACTUAL_DEPARTURE,
        categoryName: test.CATEGORY_NAME,
        expectedReturnAt: test.EXPECTED_RETURN,
        id: test.RESERVATION_ID,
        unitCodes: [test.UNIT_CODE],
      },
    ]);
  });

  it("uses the unavailable-name fallback for unresolved guides", () => {
    const workerNames =
      RESERVATION_DETAIL_WORKER_NAMES_FIXTURE.filter(
        (worker) =>
          worker.worker_id !== test.GUIDE_WORKER_ID
      );
    const detail = mapReservationDetail(
      RESERVATION_DETAIL_SOURCE_FIXTURE,
      workerNames
    );

    expect(detail.guides).toEqual([
      {
        name: test.MISSING_RELATED_NAME,
        workerId: test.GUIDE_WORKER_ID,
      },
    ]);
  });

  it("keeps expected return when dispatch is open", () => {
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
      test.EXPECTED_RETURN
    );
  });
});

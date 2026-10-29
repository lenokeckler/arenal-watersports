import { describe, expect, it } from "vitest";
import { mapReservationDetail } from "../utils/mapReservationDetail";
import {
  RESERVATION_DETAIL_TEST as test,
  RESERVATION_DETAIL_WORKER_NAMES_FIXTURE,
} from "./ReservationDetailTest.constants";
import { RESERVATION_DETAIL_SOURCE_FIXTURE } from "./ReservationDetailSourceFixture.constants";

describe("mapReservationDetail", () => {
  it("maps committed equipment", () => {
    const detail = mapReservationDetail(
      RESERVATION_DETAIL_SOURCE_FIXTURE,
      RESERVATION_DETAIL_WORKER_NAMES_FIXTURE
    );

    expect(detail.equipment).toEqual([
      {
        categoryName: test.CATEGORY_NAME,
        dispatchId: test.RESERVATION_ID,
        fuelIn: null,
        fuelOut: null,
        quantity: null,
        unitCode: test.UNIT_CODE,
        usageIn: null,
        usageOut: null,
      },
      {
        categoryName: test.CATEGORY_NAME,
        dispatchId: null,
        fuelIn: null,
        fuelOut: null,
        quantity: test.QUANTITY,
        unitCode: null,
        usageIn: null,
        usageOut: null,
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

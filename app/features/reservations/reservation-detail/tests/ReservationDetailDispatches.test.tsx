import { describe, expect, it } from "vitest";
import { formatReservationCalendarDateTime } from "@/app/components/reservation-calendar/utils/formatReservationCalendarDateTime";
import { RESERVATION_DETAIL_SECTIONS_COPY as copy } from "../constants/ReservationDetailSectionsCopy.constants";
import { RESERVATION_DETAIL_SOURCE_FIXTURE } from "./ReservationDetailSourceFixture.constants";
import { RESERVATION_DETAIL_TEST as test } from "./ReservationDetailTest.constants";
import { createReservationDetailPage } from "./ReservationDetail.page";
import { renderReservationDetail } from "./ReservationDetailTestRenderer";

const expectDispatchGroupToShow = (
  dispatchGroup: HTMLElement,
  expectedTimes: string[]
): void => {
  expectedTimes.forEach((expectedTime) => {
    expect(dispatchGroup).toHaveTextContent(expectedTime);
  });
};

const renderReservationDetailWithTwoDispatchGroups =
  (): HTMLElement[] => {
    const firstDispatch =
      RESERVATION_DETAIL_SOURCE_FIXTURE
        .reservation_dispatches[0];
    renderReservationDetail({
      ...RESERVATION_DETAIL_SOURCE_FIXTURE,
      reservation_dispatches: [
        firstDispatch,
        {
          ...firstDispatch,
          category: { name: test.SECOND_CATEGORY_NAME },
          closed_at: test.SECOND_ACTUAL_ARRIVAL,
          dispatched_at: test.SECOND_ACTUAL_DEPARTURE,
          ends_at: test.SECOND_EXPECTED_RETURN,
          id: test.SECOND_DISPATCH_ID,
        },
      ],
    });
    return createReservationDetailPage().getDispatchGroups();
  };

describe("reservation detail dispatches", (): void => {
  it("lists every group and distinguishes expected from actual times", (): void => {
    const dispatchGroups =
      renderReservationDetailWithTwoDispatchGroups();

    expect(dispatchGroups).toHaveLength(2);
    expectDispatchGroupToShow(dispatchGroups[0], [
      test.CATEGORY_NAME,
      formatReservationCalendarDateTime(
        test.ACTUAL_DEPARTURE
      ),
      formatReservationCalendarDateTime(
        test.EXPECTED_RETURN
      ),
      formatReservationCalendarDateTime(
        test.ACTUAL_ARRIVAL
      ),
    ]);
    expectDispatchGroupToShow(dispatchGroups[1], [
      test.SECOND_CATEGORY_NAME,
      formatReservationCalendarDateTime(
        test.SECOND_ACTUAL_DEPARTURE
      ),
      formatReservationCalendarDateTime(
        test.SECOND_EXPECTED_RETURN
      ),
      formatReservationCalendarDateTime(
        test.SECOND_ACTUAL_ARRIVAL
      ),
    ]);
  });

  it("marks expected return and arrival as missing for an open group", (): void => {
    const [dispatch] =
      RESERVATION_DETAIL_SOURCE_FIXTURE.reservation_dispatches;
    renderReservationDetail({
      ...RESERVATION_DETAIL_SOURCE_FIXTURE,
      reservation_dispatches: [
        { ...dispatch, closed_at: null, ends_at: null },
      ],
    });
    const [dispatchGroup] =
      createReservationDetailPage().getDispatchGroups();

    expect(dispatchGroup).toHaveTextContent(
      copy.MISSING_RETURN
    );
    expect(dispatchGroup).toHaveTextContent(
      copy.MISSING_ARRIVAL
    );
  });
});

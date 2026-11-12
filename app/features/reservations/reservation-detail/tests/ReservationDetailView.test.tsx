import { afterEach, describe, expect, it } from "vitest";
import { cleanup } from "@testing-library/react";
import { formatReservationCalendarDateTime } from "@/app/components/reservation-calendar/utils/formatReservationCalendarDateTime";
import { CALENDAR_PRESENTATION } from "@/app/constants";
import { RESERVATION_DETAIL_COPY as copy } from "../constants/ReservationDetailCopy.constants";
import { RESERVATION_DETAIL_OVERVIEW_FIXTURE } from "./ReservationDetailOverviewFixture.constants";
import { RESERVATION_DETAIL_OVERVIEW_TEST } from "./ReservationDetailOverviewTest.constants";
import { renderReservationDetailOverview } from "./ReservationDetailOverviewTestRenderer";
import { formatReservationDetailDuration } from "../utils/formatReservationDetailDuration";

afterEach(cleanup);

describe("reservation overview", (): void => {
  it("shows the reservation identity, schedule, and party summary", (): void => {
    const page = renderReservationDetailOverview();

    expect(
      page.getHeading(
        RESERVATION_DETAIL_OVERVIEW_TEST.CUSTOMER_NAME
      )
    ).toBeVisible();
    expect(
      page.getText(
        RESERVATION_DETAIL_OVERVIEW_TEST.RESERVATION_CODE
      )
    ).toBeVisible();
    expect(page.getText(copy.RENTAL)).toBeVisible();
    expect(page.getText(copy.SCHEDULED)).toBeVisible();
    expect(
      page.getTexts(
        formatReservationCalendarDateTime(
          RESERVATION_DETAIL_OVERVIEW_TEST.RESERVATION_START
        )
      )
    ).not.toHaveLength(0);
    expect(
      page.getText(
        formatReservationDetailDuration(
          RESERVATION_DETAIL_OVERVIEW_TEST.DURATION_MINUTES
        )
      )
    ).toBeVisible();
    expect(
      page.getText(
        RESERVATION_DETAIL_OVERVIEW_TEST.PEOPLE_COUNT.toLocaleString(
          CALENDAR_PRESENTATION.LOCALE
        )
      )
    ).toBeVisible();
  });
});

describe("cancelled reservation overview", (): void => {
  it("shows its cancellation reason", (): void => {
    const page = renderReservationDetailOverview({
      ...RESERVATION_DETAIL_OVERVIEW_FIXTURE,
      cancellation_reason:
        RESERVATION_DETAIL_OVERVIEW_TEST.CANCELLATION_REASON,
      status:
        RESERVATION_DETAIL_OVERVIEW_TEST.CANCELLED_RESERVATION_STATUS,
    });

    expect(
      page.getText(
        RESERVATION_DETAIL_OVERVIEW_TEST.CANCELLATION_REASON
      )
    ).toBeVisible();
    expect(page.getText(copy.CANCELLED)).toBeVisible();
  });
});

describe("combo reservation overview", (): void => {
  it("shows the combo name with its reservation type", (): void => {
    const page = renderReservationDetailOverview({
      ...RESERVATION_DETAIL_OVERVIEW_FIXTURE,
      comboName:
        RESERVATION_DETAIL_OVERVIEW_TEST.COMBO_NAME,
      type: RESERVATION_DETAIL_OVERVIEW_TEST.COMBO_RESERVATION_TYPE,
    });

    expect(
      page.getText(
        `${copy.COMBO}${copy.COMBO_SEPARATOR}${RESERVATION_DETAIL_OVERVIEW_TEST.COMBO_NAME}`
      )
    ).toBeVisible();
  });
});

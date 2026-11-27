import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  ARIA_ROLE,
  RESERVATION_STATUS,
} from "@/app/constants";
import { resolveReservationExtraTimePath } from "@/app/utils/reservations/resolveReservationExtraTimePath";
import {
  RESERVATION_DETAIL_EXTRA_TIME_OUTCOME as OUTCOME,
  RESERVATION_DETAIL_EXTRA_TIME_STATE as STATE,
} from "../constants/ReservationDetail.constants";
import { RESERVATION_DETAIL_CHARGES_COPY as COPY } from "../constants/ReservationDetailChargesCopy.constants";
import type { ReservationDetailReservationSource } from "../models/ReservationDetailReservationSource.interface";
import { mapReservationDetail } from "../utils/mapReservationDetail";
import ReservationDetailView from "../ReservationDetailView";
import { RESERVATION_DETAIL_EXTRA_TIME_TEST as TEST } from "./ReservationDetailExtraTimeTest.constants";
import { RESERVATION_DETAIL_SOURCE_FIXTURE } from "./ReservationDetailSourceFixture.constants";
import {
  RESERVATION_DETAIL_TEST,
  RESERVATION_DETAIL_WORKER_NAMES_FIXTURE,
} from "./ReservationDetailTest.constants";

const CLOSED_SOURCE: ReservationDetailReservationSource = {
  ...RESERVATION_DETAIL_SOURCE_FIXTURE,
  status: RESERVATION_STATUS.CLOSED,
};

const renderDetail = (
  source: ReservationDetailReservationSource,
  pendingMinutes?: number
): void => {
  render(
    <ReservationDetailView
      detail={mapReservationDetail(
        source,
        RESERVATION_DETAIL_WORKER_NAMES_FIXTURE,
        pendingMinutes
      )}
    />
  );
};

const queryResolveLink = () =>
  screen.queryByRole(ARIA_ROLE.LINK, {
    name: COPY.RESOLVE_EXTRA_TIME_LABEL(
      RESERVATION_DETAIL_TEST.RESERVATION_CODE
    ),
  });

describe("reservation detail extra time", () => {
  it("offers to charge the extra time still to decide", () => {
    renderDetail(CLOSED_SOURCE, TEST.MINUTES);

    expect(
      screen.getByText(
        COPY.EXTRA_TIME_STATE[STATE.PENDING](TEST.DURATION)
      )
    ).toBeInTheDocument();
    expect(queryResolveLink()).toHaveAttribute(
      "href",
      resolveReservationExtraTimePath(
        RESERVATION_DETAIL_TEST.RESERVATION_ID
      )
    );
  });

  it.each([OUTCOME.CHARGED, OUTCOME.COURTESY])(
    "shows the %s decision without the link",
    (outcome) => {
      renderDetail({
        ...CLOSED_SOURCE,
        reservation_extra_time_resolutions: {
          extra_minutes: TEST.MINUTES,
          outcome,
        },
      });

      expect(
        screen.getByText(
          COPY.EXTRA_TIME_STATE[outcome](TEST.DURATION)
        )
      ).toBeInTheDocument();
      expect(queryResolveLink()).toBeNull();
    }
  );

  it("shows nothing when there is no extra time", () => {
    renderDetail(CLOSED_SOURCE);

    expect(queryResolveLink()).toBeNull();
    expect(
      screen.queryByText(
        COPY.EXTRA_TIME_STATE[STATE.PENDING](TEST.DURATION)
      )
    ).toBeNull();
  });
});

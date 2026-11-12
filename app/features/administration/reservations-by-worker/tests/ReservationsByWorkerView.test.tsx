import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PAGINATION } from "@/app/constants";
import ReservationsByWorkerView from "../ReservationsByWorkerView";
import { buildReservationsByWorkerPath } from "../utils/buildReservationsByWorkerPath";
import {
  RESERVATIONS_BY_WORKER_EMPTY_PAGE,
  RESERVATIONS_BY_WORKER_TEST_PAGE,
  RESERVATIONS_BY_WORKER_TEST_RECORD,
} from "./ReservationsByWorkerView.constants";
import { createReservationsByWorkerViewPage } from "./ReservationsByWorkerView.page";

describe("ReservationsByWorkerView", () => {
  it("shows the reservation creator and server pagination", () => {
    render(
      <ReservationsByWorkerView
        reservationsPage={RESERVATIONS_BY_WORKER_TEST_PAGE}
      />
    );
    const reservationsPage =
      createReservationsByWorkerViewPage();

    expect(
      reservationsPage.getCustomer(
        RESERVATIONS_BY_WORKER_TEST_RECORD.customerName
      )
    ).toBeInTheDocument();
    expect(
      reservationsPage.getCreator(
        RESERVATIONS_BY_WORKER_TEST_RECORD.workerName
      )
    ).toBeInTheDocument();
    expect(
      reservationsPage.getPageIndicator(
        PAGINATION.ONE_PAGE,
        RESERVATIONS_BY_WORKER_TEST_PAGE.pageCount
      )
    ).toBeInTheDocument();
    expect(
      reservationsPage.getNextPageLink()
    ).toHaveAttribute(
      "href",
      buildReservationsByWorkerPath(
        PAGINATION.DEFAULT_PAGE + PAGINATION.ONE_PAGE
      )
    );
  });

  it("shows an explicit empty state", () => {
    render(
      <ReservationsByWorkerView
        reservationsPage={RESERVATIONS_BY_WORKER_EMPTY_PAGE}
      />
    );
    const reservationsPage =
      createReservationsByWorkerViewPage();

    expect(
      reservationsPage.getEmptyState()
    ).toBeInTheDocument();
  });
});

import { render } from "@testing-library/react";
import type { ReservationDetailReservationSource } from "../models/ReservationDetailReservationSource.interface";
import { RESERVATION_DETAIL_WORKER_NAMES_FIXTURE } from "./ReservationDetailTest.constants";
import { RESERVATION_DETAIL_SOURCE_FIXTURE } from "./ReservationDetailSourceFixture.constants";
import { createReservationDetailPage } from "./ReservationDetail.page";
import { mapReservationDetail } from "../utils/mapReservationDetail";
import ReservationDetailView from "../ReservationDetailView";

export const renderReservationDetail = (
  source: ReservationDetailReservationSource = RESERVATION_DETAIL_SOURCE_FIXTURE
) => {
  render(
    <ReservationDetailView
      detail={mapReservationDetail(
        source,
        RESERVATION_DETAIL_WORKER_NAMES_FIXTURE
      )}
    />
  );
  return createReservationDetailPage();
};

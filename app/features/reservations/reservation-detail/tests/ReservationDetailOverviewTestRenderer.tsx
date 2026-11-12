import { render } from "@testing-library/react";
import type { ReservationDetail } from "../models/ReservationDetail.interface";
import ReservationDetailView from "../ReservationDetailView";
import { createReservationDetailPage } from "./ReservationDetail.page";
import { RESERVATION_DETAIL_OVERVIEW_FIXTURE } from "./ReservationDetailOverviewFixture.constants";

export const renderReservationDetailOverview = (
  detail: ReservationDetail = RESERVATION_DETAIL_OVERVIEW_FIXTURE
) => {
  render(<ReservationDetailView detail={detail} />);
  return createReservationDetailPage();
};

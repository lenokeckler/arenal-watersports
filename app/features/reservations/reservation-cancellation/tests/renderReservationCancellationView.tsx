import { render } from "@testing-library/react";
import ReservationCancellationView from "../ReservationCancellationView";
import type { ReservationCancellation } from "../models/ReservationCancellation.interface";
import { EXPECTED_DISPATCHED } from "./ReservationCancellation.constants";
import { createReservationCancellationViewPage } from "./ReservationCancellationView.page";

export const renderReservationCancellationView = (
  cancellation: ReservationCancellation = EXPECTED_DISPATCHED
) => {
  render(
    <ReservationCancellationView
      cancellation={cancellation}
    />
  );
  return createReservationCancellationViewPage();
};

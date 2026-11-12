import { render } from "@testing-library/react";
import ReservationCancellationView from "../ReservationCancellationView";
import type { ReservationCancellation } from "../models/ReservationCancellation.interface";
import { EXPECTED_DISPATCHED } from "./ReservationCancellation.constants";
import { createReservationCancellationViewPage } from "./ReservationCancellationView.page";

export const renderReservationCancellationView = (
  cancellation: ReservationCancellation = EXPECTED_DISPATCHED
) => {
  const { rerender } = render(
    <ReservationCancellationView
      cancellation={cancellation}
    />
  );
  return {
    ...createReservationCancellationViewPage(),
    refresh: (next: ReservationCancellation) =>
      rerender(
        <ReservationCancellationView cancellation={next} />
      ),
  };
};

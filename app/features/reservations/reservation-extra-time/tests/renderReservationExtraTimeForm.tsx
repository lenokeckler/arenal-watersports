import { render } from "@testing-library/react";
import ReservationExtraTimeForm from "../components/ReservationExtraTimeForm";
import { useReservationExtraTimeViewModel } from "../hooks/useReservationExtraTimeViewModel";
import { EXTRA_TIME_RESERVATION_ID } from "./ReservationExtraTime.constants";
import { createReservationExtraTimeFormPage } from "./ReservationExtraTimeForm.page";

const ReservationExtraTimeFormHarness =
  (): React.JSX.Element => {
    const viewModel = useReservationExtraTimeViewModel(
      EXTRA_TIME_RESERVATION_ID
    );

    return (
      <form
        noValidate
        onSubmit={viewModel.handleSubmit}
      >
        <ReservationExtraTimeForm
          reservationId={EXTRA_TIME_RESERVATION_ID}
          viewModel={viewModel}
        />
      </form>
    );
  };

export const renderReservationExtraTimeForm = () => {
  render(<ReservationExtraTimeFormHarness />);
  return createReservationExtraTimeFormPage();
};

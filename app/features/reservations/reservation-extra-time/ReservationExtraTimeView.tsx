"use client";

import { AUTOCOMPLETE } from "@/app/constants";
import ReservationExtraTimeForm from "./components/ReservationExtraTimeForm";
import ReservationExtraTimeGroups from "./components/ReservationExtraTimeGroups";
import ReservationExtraTimeLayout from "./components/ReservationExtraTimeLayout";
import ReservationExtraTimeSuccess from "./components/ReservationExtraTimeSuccess";
import { useReservationExtraTimeErrorFocus } from "./hooks/useReservationExtraTimeErrorFocus";
import { useReservationExtraTimeViewModel } from "./hooks/useReservationExtraTimeViewModel";
import type { ReservationExtraTimeViewProps } from "./models/ReservationExtraTimeViewProps.interface";
import { RESERVATION_EXTRA_TIME_FORM_CLASS } from "./styles/ReservationExtraTimeForm.styles";

const ReservationExtraTimeView = ({
  extraTime,
}: ReservationExtraTimeViewProps): React.JSX.Element => {
  const viewModel = useReservationExtraTimeViewModel(
    extraTime.id
  );
  useReservationExtraTimeErrorFocus(
    viewModel.errors,
    viewModel.formError
  );

  return (
    <ReservationExtraTimeLayout extraTime={extraTime}>
      {viewModel.recorded ? (
        <ReservationExtraTimeSuccess
          extraTime={extraTime}
          recorded={viewModel.recorded}
        />
      ) : (
        <form
          noValidate
          autoComplete={AUTOCOMPLETE.OFF}
          aria-busy={viewModel.isPending}
          className={RESERVATION_EXTRA_TIME_FORM_CLASS}
          onSubmit={viewModel.handleSubmit}
        >
          <ReservationExtraTimeGroups
            extraTime={extraTime}
          />
          <ReservationExtraTimeForm
            reservationId={extraTime.id}
            viewModel={viewModel}
          />
        </form>
      )}
    </ReservationExtraTimeLayout>
  );
};

export default ReservationExtraTimeView;

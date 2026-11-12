"use client";

import ReservationChargeForm from "./components/ReservationChargeForm";
import ReservationChargeLayout from "./components/ReservationChargeLayout";
import ReservationChargeSuccess from "./components/ReservationChargeSuccess";
import ReservationChargeSummary from "./components/ReservationChargeSummary";
import { useReservationChargeErrorFocus } from "./hooks/useReservationChargeErrorFocus";
import { useReservationChargeViewModel } from "./hooks/useReservationChargeViewModel";
import type { ReservationChargeViewProps } from "./models/ReservationChargeViewProps.interface";
import { RESERVATION_CHARGE_FORM_CLASS } from "./styles/ReservationChargeForm.styles";

const ReservationChargeView = ({
  charge,
}: ReservationChargeViewProps): React.JSX.Element => {
  const viewModel = useReservationChargeViewModel(charge);
  useReservationChargeErrorFocus(
    viewModel.errors,
    viewModel.formError
  );

  return (
    <ReservationChargeLayout reservationId={charge.id}>
      {viewModel.recorded ? (
        <ReservationChargeSuccess
          code={charge.code}
          recorded={viewModel.recorded}
          reservationId={charge.id}
        />
      ) : (
        <form
          noValidate
          autoComplete="off"
          aria-busy={viewModel.isPending}
          className={RESERVATION_CHARGE_FORM_CLASS}
          onSubmit={viewModel.handleSubmit}
        >
          <ReservationChargeSummary charge={charge} />
          <ReservationChargeForm
            charge={charge}
            viewModel={viewModel}
          />
        </form>
      )}
    </ReservationChargeLayout>
  );
};

export default ReservationChargeView;

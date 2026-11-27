"use client";

import { AUTOCOMPLETE } from "@/app/constants";
import ReservationDepositForm from "./components/ReservationDepositForm";
import ReservationDepositLayout from "./components/ReservationDepositLayout";
import ReservationDepositSuccess from "./components/ReservationDepositSuccess";
import ReservationDepositSummary from "./components/ReservationDepositSummary";
import { useReservationDepositErrorFocus } from "./hooks/useReservationDepositErrorFocus";
import { useReservationDepositViewModel } from "./hooks/useReservationDepositViewModel";
import type { ReservationDepositViewProps } from "./models/ReservationDepositViewProps.interface";
import { RESERVATION_DEPOSIT_FORM_CLASS } from "./styles/ReservationDepositForm.styles";

const ReservationDepositView = ({
  deposit,
}: ReservationDepositViewProps): React.JSX.Element => {
  const viewModel = useReservationDepositViewModel(deposit);
  useReservationDepositErrorFocus(
    viewModel.errors,
    viewModel.formError
  );

  return (
    <ReservationDepositLayout reservationId={deposit.id}>
      {viewModel.recorded ? (
        <ReservationDepositSuccess
          code={deposit.code}
          recorded={viewModel.recorded}
          reservationId={deposit.id}
        />
      ) : (
        <form
          noValidate
          autoComplete={AUTOCOMPLETE.OFF}
          aria-busy={viewModel.isPending}
          className={RESERVATION_DEPOSIT_FORM_CLASS}
          onSubmit={viewModel.handleSubmit}
        >
          <ReservationDepositSummary deposit={deposit} />
          <ReservationDepositForm
            reservationId={deposit.id}
            viewModel={viewModel}
          />
        </form>
      )}
    </ReservationDepositLayout>
  );
};

export default ReservationDepositView;

"use client";

import { hasReservationRefundable } from "@/app/utils/reservations/hasReservationRefundable";
import ReservationRefundAvailable from "./components/ReservationRefundAvailable";
import ReservationRefundForm from "./components/ReservationRefundForm";
import ReservationRefundLayout from "./components/ReservationRefundLayout";
import ReservationRefundSuccess from "./components/ReservationRefundSuccess";
import ReservationRefundSummary from "./components/ReservationRefundSummary";
import ReservationRefundUnavailable from "./components/ReservationRefundUnavailable";
import { useReservationRefundErrorFocus } from "./hooks/useReservationRefundErrorFocus";
import { useReservationRefundViewModel } from "./hooks/useReservationRefundViewModel";
import type { ReservationRefundViewProps } from "./models/ReservationRefundViewProps.interface";
import { RESERVATION_REFUND_FORM_CLASS } from "./styles/ReservationRefundForm.styles";

const ReservationRefundView = ({
  refund,
}: ReservationRefundViewProps): React.JSX.Element => {
  const viewModel = useReservationRefundViewModel(refund);
  useReservationRefundErrorFocus(
    viewModel.errors,
    viewModel.formError
  );

  if (
    !hasReservationRefundable(refund.refundable) &&
    viewModel.recorded === null
  ) {
    return (
      <ReservationRefundUnavailable
        reservationId={refund.id}
      />
    );
  }

  return (
    <ReservationRefundLayout reservationId={refund.id}>
      {viewModel.recorded ? (
        <ReservationRefundSuccess
          code={refund.code}
          recorded={viewModel.recorded}
          reservationId={refund.id}
        />
      ) : (
        <form
          noValidate
          autoComplete="off"
          aria-busy={viewModel.isPending}
          className={RESERVATION_REFUND_FORM_CLASS}
          onSubmit={viewModel.handleSubmit}
        >
          <ReservationRefundSummary refund={refund} />
          <ReservationRefundAvailable refund={refund} />
          <ReservationRefundForm
            refund={refund}
            viewModel={viewModel}
          />
        </form>
      )}
    </ReservationRefundLayout>
  );
};

export default ReservationRefundView;

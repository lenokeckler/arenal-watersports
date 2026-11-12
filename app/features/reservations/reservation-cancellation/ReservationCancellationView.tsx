"use client";

import ReservationCancellationForm from "./components/ReservationCancellationForm";
import ReservationCancellationLayout from "./components/ReservationCancellationLayout";
import ReservationCancellationSuccess from "./components/ReservationCancellationSuccess";
import ReservationCancellationSummary from "./components/ReservationCancellationSummary";
import ReservationCancellationUnavailable from "./components/ReservationCancellationUnavailable";
import { useReservationCancellationErrorFocus } from "./hooks/useReservationCancellationErrorFocus";
import { useReservationCancellationViewModel } from "./hooks/useReservationCancellationViewModel";
import type { ReservationCancellationViewProps } from "./models/ReservationCancellationViewProps.interface";
import { RESERVATION_CANCELLATION_FORM_CLASS } from "./styles/ReservationCancellationForm.styles";
import { isReservationCancellationBlockedStatus } from "./utils/isReservationCancellationBlockedStatus";

const ReservationCancellationView = ({
  cancellation,
}: ReservationCancellationViewProps): React.JSX.Element => {
  const viewModel =
    useReservationCancellationViewModel(cancellation);
  useReservationCancellationErrorFocus(
    viewModel.errors,
    viewModel.formError
  );

  if (viewModel.isCancelled) {
    return (
      <ReservationCancellationLayout>
        <ReservationCancellationSuccess
          code={cancellation.code}
        />
      </ReservationCancellationLayout>
    );
  }

  if (
    isReservationCancellationBlockedStatus(
      cancellation.status
    )
  ) {
    return (
      <ReservationCancellationUnavailable
        status={cancellation.status}
      />
    );
  }

  return (
    <ReservationCancellationLayout>
      <form
        noValidate
        autoComplete="off"
        aria-busy={viewModel.isPending}
        className={RESERVATION_CANCELLATION_FORM_CLASS}
        onSubmit={viewModel.handleSubmit}
      >
        <ReservationCancellationSummary
          cancellation={cancellation}
        />
        <ReservationCancellationForm
          viewModel={viewModel}
        />
      </form>
    </ReservationCancellationLayout>
  );
};

export default ReservationCancellationView;

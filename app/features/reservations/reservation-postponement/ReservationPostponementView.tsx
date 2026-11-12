"use client";

import ReservationPostponementActions from "./components/ReservationPostponementActions";
import ReservationPostponementCauseChoice from "./components/ReservationPostponementCauseChoice";
import ReservationPostponementNotes from "./components/ReservationPostponementNotes";
import ReservationPostponementReadings from "./components/ReservationPostponementReadings";
import ReservationPostponementSchedule from "./components/ReservationPostponementSchedule";
import ReservationPostponementSuccess from "./components/ReservationPostponementSuccess";
import ReservationPostponementSummary from "./components/ReservationPostponementSummary";
import { useReservationPostponementErrorFocus } from "./hooks/useReservationPostponementErrorFocus";
import { useReservationPostponementViewModel } from "./hooks/useReservationPostponementViewModel";
import type { ReservationPostponementViewProps } from "./models/ReservationPostponementViewProps.interface";
import { RESERVATION_POSTPONEMENT_FORM_CLASS } from "./styles/ReservationPostponementForm.styles";

const ReservationPostponementView = ({
  postponement,
}: ReservationPostponementViewProps): React.JSX.Element => {
  const viewModel =
    useReservationPostponementViewModel(postponement);
  useReservationPostponementErrorFocus(
    viewModel.errors,
    viewModel.formError
  );

  if (viewModel.isSubmitted) {
    return (
      <ReservationPostponementSuccess
        date={viewModel.draft.date}
        time={viewModel.draft.time}
      />
    );
  }

  return (
    <form
      noValidate
      autoComplete="off"
      aria-busy={viewModel.isPending}
      className={RESERVATION_POSTPONEMENT_FORM_CLASS}
      onSubmit={viewModel.handleSubmit}
    >
      <ReservationPostponementSummary
        postponement={postponement}
      />
      <ReservationPostponementNotes
        isDispatched={postponement.isDispatched}
      />
      <ReservationPostponementSchedule
        viewModel={viewModel}
      />
      <ReservationPostponementCauseChoice
        viewModel={viewModel}
      />
      <ReservationPostponementReadings
        units={postponement.readingUnits}
        viewModel={viewModel}
      />
      <ReservationPostponementActions
        viewModel={viewModel}
      />
    </form>
  );
};

export default ReservationPostponementView;

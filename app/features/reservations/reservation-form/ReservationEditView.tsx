"use client";

import { AUTOCOMPLETE } from "@/app/constants";
import ReservationEditFields from "./components/ReservationEditFields";
import ReservationEditLastEdit from "./components/ReservationEditLastEdit";
import ReservationEditSummary from "./components/ReservationEditSummary";
import ReservationFormFeedback from "./components/ReservationFormFeedback";
import ReservationFormHeader from "./components/ReservationFormHeader";
import ReservationFormSubmitAction from "./components/ReservationFormSubmitAction";
import { RESERVATION_EDIT_COPY } from "./constants/ReservationEditCopy.constants";
import { useReservationEditViewModel } from "./hooks/useReservationEditViewModel";
import type { ReservationEditViewProps } from "./models/ReservationEditViewProps.interface";
import {
  RESERVATION_FORM_CARD_CLASS,
  RESERVATION_FORM_MAIN_CLASS,
  RESERVATION_FORM_PAGE_CLASS,
} from "./styles/ReservationFormView.styles";

const ReservationEditView = ({
  categories,
  reservation,
}: ReservationEditViewProps): React.JSX.Element => {
  const viewModel = useReservationEditViewModel({
    categories,
    reservation,
  });

  return (
    <main className={RESERVATION_FORM_MAIN_CLASS}>
      <div className={RESERVATION_FORM_PAGE_CLASS}>
        <ReservationFormHeader
          copy={RESERVATION_EDIT_COPY}
          viewModel={viewModel}
        />
        <div className={RESERVATION_FORM_CARD_CLASS}>
          <ReservationEditSummary
            reservation={reservation}
          />
          <ReservationEditLastEdit
            label={reservation.lastEditLabel}
          />
          <form
            noValidate
            autoComplete={AUTOCOMPLETE.OFF}
            onSubmit={viewModel.handleSubmit}
          >
            <ReservationEditFields
              categories={viewModel.categories}
              reservation={reservation}
              viewModel={viewModel}
            />
            <ReservationFormFeedback
              categories={viewModel.categories}
              copy={RESERVATION_EDIT_COPY}
              viewModel={viewModel}
            />
            <ReservationFormSubmitAction
              copy={RESERVATION_EDIT_COPY}
              isDisabled={viewModel.isSubmitDisabled}
              viewModel={viewModel}
            />
          </form>
        </div>
      </div>
    </main>
  );
};

export default ReservationEditView;

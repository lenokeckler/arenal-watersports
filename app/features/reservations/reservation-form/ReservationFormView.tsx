"use client";

import type { ReservationFormViewProps } from "./models/ReservationFormViewProps.interface";
import { useReservationFormViewModel } from "./hooks/useReservationFormViewModel";
import {
  RESERVATION_FORM_MAIN_CLASS,
  RESERVATION_FORM_PAGE_CLASS,
} from "./styles/ReservationFormView.styles";
import ReservationFormCard from "./components/ReservationFormCard";
import ReservationFormHeader from "./components/ReservationFormHeader";

const ReservationFormView = ({
  categories,
  guideLoadResult,
  initialDate,
  predefinedCombos,
}: ReservationFormViewProps): React.JSX.Element => {
  const viewModel = useReservationFormViewModel(
    initialDate,
    categories,
    guideLoadResult,
    predefinedCombos
  );

  return (
    <main className={RESERVATION_FORM_MAIN_CLASS}>
      <div className={RESERVATION_FORM_PAGE_CLASS}>
        <ReservationFormHeader viewModel={viewModel} />
        <ReservationFormCard
          categories={viewModel.categories}
          viewModel={viewModel}
        />
      </div>
    </main>
  );
};

export default ReservationFormView;

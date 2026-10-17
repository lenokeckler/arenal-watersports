"use client";

import {
  BUTTON,
  STRING,
  TitleVariant,
} from "@/app/constants";
import Button from "@/app/components/button/Button";
import Text from "@/app/components/text/Text";
import Title from "@/app/components/title/Title";
import { RESERVATION_FORM_UI_COPY } from "./constants/ReservationFormUiCopy.constants";
import { RESERVATION_FORM_FIELD_ID } from "./constants/ReservationFormUi.constants";
import { useReservationFormViewModel } from "./hooks/useReservationFormViewModel";
import type { ReservationFormViewProps } from "./models/ReservationFormViewProps.interface";
import {
  RESERVATION_FORM_ACTIONS_CLASS,
  RESERVATION_FORM_BACK_CLASS,
  RESERVATION_FORM_CARD_CLASS,
  RESERVATION_FORM_DESCRIPTION_CLASS,
  RESERVATION_FORM_ERROR_CLASS,
  RESERVATION_FORM_HEADER_CLASS,
  RESERVATION_FORM_MAIN_CLASS,
  RESERVATION_FORM_PAGE_CLASS,
  RESERVATION_FORM_STATUS_CLASS,
  RESERVATION_FORM_SUBMIT_CLASS,
  RESERVATION_FORM_TITLE_CLASS,
} from "./styles/ReservationFormView.styles";
import ReservationFormFields from "./components/ReservationFormFields";

const ReservationFormView = ({
  categories,
  initialDate,
  unitCategories,
}: ReservationFormViewProps): React.JSX.Element => {
  const allCategories = [...categories, ...unitCategories];
  const viewModel = useReservationFormViewModel({
    categories: allCategories,
    initialCategoryId: STRING.Empty,
    initialDate,
    unitCategories,
  });
  const submitLabel = viewModel.isPending
    ? RESERVATION_FORM_UI_COPY.SUBMITTING
    : RESERVATION_FORM_UI_COPY.SUBMIT;

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

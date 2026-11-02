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
  const allCategories = Array.from(
    new Map(
      [...categories, ...unitCategories].map((category) => [
        category.id,
        category,
      ])
    ).values()
  );
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
        <header className={RESERVATION_FORM_HEADER_CLASS}>
          <Button
            type="button"
            variant={BUTTON.BASE}
            className={RESERVATION_FORM_BACK_CLASS}
            onClick={viewModel.handleBack}
          >
            {RESERVATION_FORM_UI_COPY.BACK_TO_CALENDAR}
          </Button>
          <Title
            id={RESERVATION_FORM_FIELD_ID.HEADING}
            variant={TitleVariant.PRIMARY}
            text={RESERVATION_FORM_UI_COPY.TITLE}
            className={RESERVATION_FORM_TITLE_CLASS}
          />
          <Text
            className={RESERVATION_FORM_DESCRIPTION_CLASS}
          >
            {RESERVATION_FORM_UI_COPY.DESCRIPTION}
          </Text>
        </header>
        <div className={RESERVATION_FORM_CARD_CLASS}>
          <form
            noValidate
            autoComplete="off"
            onSubmit={viewModel.handleSubmit}
          >
            <ReservationFormFields
              categories={viewModel.categories}
              viewModel={viewModel}
            />
            {allCategories.length === 0 && (
              <Text
                role="status"
                className={RESERVATION_FORM_ERROR_CLASS}
              >
                {RESERVATION_FORM_UI_COPY.NO_CATEGORIES}
              </Text>
            )}
            {viewModel.formError && (
              <Text
                role="alert"
                className={RESERVATION_FORM_ERROR_CLASS}
              >
                {viewModel.formError}
              </Text>
            )}
            {viewModel.isSubmitted && (
              <Text
                role="status"
                className={RESERVATION_FORM_STATUS_CLASS}
              >
                {RESERVATION_FORM_UI_COPY.SUCCESS}
              </Text>
            )}
            <div
              role="group"
              aria-label={RESERVATION_FORM_UI_COPY.ACTIONS}
              className={RESERVATION_FORM_ACTIONS_CLASS}
            >
              <Button
                type="submit"
                variant={BUTTON.PRIMARY}
                className={RESERVATION_FORM_SUBMIT_CLASS}
                disabled={viewModel.isSubmitDisabled}
              >
                {submitLabel}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ReservationFormView;

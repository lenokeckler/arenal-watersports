import { Text } from "@/app/components";
import { ARIA_ROLE } from "@/app/constants";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import { RESERVATION_FORM_FIELD_ID } from "../constants/ReservationFormUi.constants";
import type { ReservationFormFieldsProps } from "../models/ReservationFormFieldsProps.interface";
import {
  RESERVATION_FORM_CATEGORY_GRID_CLASS,
  RESERVATION_FORM_CATEGORY_LEGEND_CLASS,
  RESERVATION_FORM_ERROR_CLASS,
  RESERVATION_FORM_FIELD_CLASS,
} from "../styles/ReservationFormView.styles";
import { ReservationCategoryPreview } from "./ReservationCategoryPreview";

export const ReservationEquipmentCategoryFields = ({
  categories,
  viewModel,
}: ReservationFormFieldsProps): React.JSX.Element => (
  <fieldset
    className={RESERVATION_FORM_FIELD_CLASS}
    aria-describedby={
      viewModel.errors.categoryId
        ? RESERVATION_FORM_FIELD_ID.CATEGORY_ERROR
        : undefined
    }
  >
    <legend
      className={RESERVATION_FORM_CATEGORY_LEGEND_CLASS}
    >
      {RESERVATION_FORM_UI_COPY.CATEGORY}
    </legend>
    <div className={RESERVATION_FORM_CATEGORY_GRID_CLASS}>
      {categories.map((category) => (
        <ReservationCategoryPreview
          key={category.id}
          category={category}
          isSelected={
            viewModel.values.categoryId === category.id
          }
          onSelect={viewModel.handleCategoryChange}
        />
      ))}
    </div>
    {viewModel.errors.categoryId ? (
      <Text
        id={RESERVATION_FORM_FIELD_ID.CATEGORY_ERROR}
        role={ARIA_ROLE.ALERT}
        className={RESERVATION_FORM_ERROR_CLASS}
      >
        {viewModel.errors.categoryId}
      </Text>
    ) : null}
  </fieldset>
);

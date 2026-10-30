import {
  ARIA_ROLE,
  INPUT_TYPES,
  STRING,
} from "@/app/constants";
import { FormField, Text } from "@/app/components";
import type { ReservationFormFieldsProps } from "../models/ReservationFormFieldsProps.interface";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import { RESERVATION_FORM_FIELD_ID } from "../constants/ReservationFormUi.constants";
import {
  RESERVATION_FORM_CATEGORY_GRID_CLASS,
  RESERVATION_FORM_CATEGORY_LEGEND_CLASS,
  RESERVATION_FORM_ERROR_CLASS,
  RESERVATION_FORM_FIELD_CLASS,
} from "../styles/ReservationFormView.styles";
import { ReservationCategoryPreview } from "./ReservationCategoryPreview";

const CategorySelect = ({
  categories,
  viewModel,
}: ReservationFormFieldsProps): React.JSX.Element => (
  <FormField
    id={RESERVATION_FORM_FIELD_ID.CATEGORY}
    name={RESERVATION_FORM_FIELD_ID.CATEGORY}
    label={RESERVATION_FORM_UI_COPY.CATEGORY}
    labelSuffix={STRING.Empty}
    options={categories.map((category) => ({
      key: category.id,
      label: category.name,
      value: category.id,
    }))}
    type={INPUT_TYPES.SELECT}
    placeholder={
      RESERVATION_FORM_UI_COPY.CATEGORY_PLACEHOLDER
    }
    value={viewModel.values.categoryId}
    onChange={(event) =>
      viewModel.handleCategoryChange(event.target.value)
    }
    error={viewModel.errors.categoryId}
    describedBy={
      viewModel.errors.categoryId
        ? RESERVATION_FORM_FIELD_ID.CATEGORY_ERROR
        : undefined
    }
  />
);

const CategoryError = ({
  viewModel,
}: ReservationFormFieldsProps): React.JSX.Element => (
  <>
    {viewModel.errors.categoryId ? (
      <Text
        id={RESERVATION_FORM_FIELD_ID.CATEGORY_ERROR}
        role={ARIA_ROLE.ALERT}
        className={RESERVATION_FORM_ERROR_CLASS}
      >
        {viewModel.errors.categoryId}
      </Text>
    ) : null}
  </>
);

const CategoryGallery = ({
  categories,
}: ReservationFormFieldsProps): React.JSX.Element => (
  <>
    {categories.map((category) => (
      <ReservationCategoryPreview
        key={category.id}
        categoryName={category.name}
      />
    ))}
  </>
);

export const ReservationEquipmentCategoryFields = ({
  categories,
  viewModel,
}: ReservationFormFieldsProps): React.JSX.Element => (
  <div className={RESERVATION_FORM_FIELD_CLASS}>
    <div
      role={ARIA_ROLE.GROUP}
      aria-label={RESERVATION_FORM_UI_COPY.CATEGORY}
      className={RESERVATION_FORM_CATEGORY_GRID_CLASS}
      aria-describedby={
        viewModel.errors.categoryId
          ? RESERVATION_FORM_FIELD_ID.CATEGORY_ERROR
          : undefined
      }
    >
      <Text
        className={RESERVATION_FORM_CATEGORY_LEGEND_CLASS}
      >
        {RESERVATION_FORM_UI_COPY.CATEGORY}
      </Text>
      <CategorySelect
        categories={categories}
        viewModel={viewModel}
      />
      <CategoryGallery
        categories={categories}
        viewModel={viewModel}
      />
    </div>
    <CategoryError
      categories={categories}
      viewModel={viewModel}
    />
  </div>
);

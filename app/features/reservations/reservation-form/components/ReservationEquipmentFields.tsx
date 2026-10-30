import { INPUT_TYPES } from "@/app/constants";
import FormField from "@/app/components/form-field/FormField";
import { FORM_FIELD_VARIANT } from "@/app/components/form-field/constants/FormFieldVariant.constants";
import { Image, Label, Text } from "@/app/components";
import { resolveReservationEquipmentImage } from "@/app/components/reservation-calendar/utils/resolveReservationEquipmentImage";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import {
  RESERVATION_FORM_CATEGORY_IMAGE_SIZE,
  RESERVATION_FORM_FIELD_ID,
  RESERVATION_FORM_INPUT_TYPE,
} from "../constants/ReservationFormUi.constants";
import type { ReservationFormFieldsProps } from "../models/ReservationFormFieldsProps.interface";
import {
  RESERVATION_FORM_CATEGORY_IMAGE_CLASS,
  RESERVATION_FORM_CATEGORY_GRID_CLASS,
  RESERVATION_FORM_CATEGORY_INPUT_CLASS,
  RESERVATION_FORM_CATEGORY_LEGEND_CLASS,
  RESERVATION_FORM_EQUIPMENT_NOTE_CLASS,
  RESERVATION_FORM_ERROR_CLASS,
  RESERVATION_FORM_FIELD_CLASS,
  RESERVATION_FORM_INPUT_CLASS,
  resolveReservationCategoryOptionClassName,
} from "../styles/ReservationFormView.styles";

const ReservationEquipmentFields = ({
  categories,
  viewModel,
}: ReservationFormFieldsProps): React.JSX.Element => {
  const categoryOptions = categories.map((category) => ({
    key: category.id,
    label: category.name,
    value: category.id,
  }));
  return (
    <>
      <div className={RESERVATION_FORM_FIELD_CLASS}>
        <fieldset
          className={RESERVATION_FORM_CATEGORY_GRID_CLASS}
          aria-describedby={
            viewModel.errors.categoryId
              ? RESERVATION_FORM_FIELD_ID.CATEGORY_ERROR
              : undefined
          }
          aria-invalid={Boolean(
            viewModel.errors.categoryId
          )}
        >
          <legend
            className={
              RESERVATION_FORM_CATEGORY_LEGEND_CLASS
            }
          >
            {RESERVATION_FORM_UI_COPY.CATEGORY}
          </legend>
          {categoryOptions.map((category) => {
            const image = resolveReservationEquipmentImage(
              category.label
            );
            const isSelected =
              category.value ===
              viewModel.values.categoryId;

            return (
              <Label
                key={category.key}
                className={resolveReservationCategoryOptionClassName(
                  isSelected
                )}
              >
                <input
                  aria-label={category.label}
                  checked={isSelected}
                  className={
                    RESERVATION_FORM_CATEGORY_INPUT_CLASS
                  }
                  name={RESERVATION_FORM_FIELD_ID.CATEGORY}
                  onChange={() =>
                    viewModel.handleCategoryChange(
                      category.value
                    )
                  }
                  type={RESERVATION_FORM_INPUT_TYPE.RADIO}
                  value={category.value}
                />
                {image === null ? null : (
                  <Image
                    alt={image.alt}
                    className={
                      RESERVATION_FORM_CATEGORY_IMAGE_CLASS
                    }
                    height={
                      RESERVATION_FORM_CATEGORY_IMAGE_SIZE.HEIGHT
                    }
                    src={image.source}
                    width={
                      RESERVATION_FORM_CATEGORY_IMAGE_SIZE.WIDTH
                    }
                    priority={false}
                  />
                )}
                <Text>{category.label}</Text>
              </Label>
            );
          })}
        </fieldset>
        {viewModel.errors.categoryId ? (
          <Text
            id={RESERVATION_FORM_FIELD_ID.CATEGORY_ERROR}
            role="alert"
            className={RESERVATION_FORM_ERROR_CLASS}
          >
            {viewModel.errors.categoryId}
          </Text>
        ) : null}
      </div>
      <div className={RESERVATION_FORM_FIELD_CLASS}>
        <FormField
          id={RESERVATION_FORM_FIELD_ID.QUANTITY}
          name={RESERVATION_FORM_FIELD_ID.QUANTITY}
          label={RESERVATION_FORM_UI_COPY.QUANTITY}
          classNameField={RESERVATION_FORM_INPUT_CLASS}
          type={INPUT_TYPES.NUMBER}
          value={String(viewModel.values.quantity)}
          onChange={(event) =>
            viewModel.handleQuantityChange(
              Number(event.target.value)
            )
          }
          error={viewModel.errors.quantity}
          showErrorText
          variant={FORM_FIELD_VARIANT.GLASS}
        />
      </div>
      <Text
        className={RESERVATION_FORM_EQUIPMENT_NOTE_CLASS}
      >
        {RESERVATION_FORM_UI_COPY.EQUIPMENT_NOTE}
      </Text>
    </>
  );
};

export default ReservationEquipmentFields;

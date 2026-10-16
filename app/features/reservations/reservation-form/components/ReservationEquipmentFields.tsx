import { INPUT_TYPES } from "@/app/constants";
import FormField from "@/app/components/form-field/FormField";
import { FORM_FIELD_VARIANT } from "@/app/components/form-field/constants/FormFieldVariant.constants";
import Text from "@/app/components/text/Text";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import { RESERVATION_FORM_FIELD_ID } from "../constants/ReservationFormUi.constants";
import type { ReservationFormFieldsProps } from "../models/ReservationFormFieldsProps.interface";
import {
  RESERVATION_FORM_EQUIPMENT_NOTE_CLASS,
  RESERVATION_FORM_FIELD_CLASS,
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
        <FormField
          id={RESERVATION_FORM_FIELD_ID.CATEGORY}
          name={RESERVATION_FORM_FIELD_ID.CATEGORY}
          label={RESERVATION_FORM_UI_COPY.CATEGORY}
          type={INPUT_TYPES.SELECT}
          value={viewModel.values.categoryId}
          options={categoryOptions}
          placeholder={
            RESERVATION_FORM_UI_COPY.CATEGORY_PLACEHOLDER
          }
          disabled={categories.length === 0}
          onChange={(event) =>
            viewModel.handleCategoryChange(
              event.target.value
            )
          }
          error={viewModel.errors.categoryId}
          showErrorText
          variant={FORM_FIELD_VARIANT.GLASS}
        />
      </div>
      <div className={RESERVATION_FORM_FIELD_CLASS}>
        <FormField
          id={RESERVATION_FORM_FIELD_ID.QUANTITY}
          name={RESERVATION_FORM_FIELD_ID.QUANTITY}
          label={RESERVATION_FORM_UI_COPY.QUANTITY}
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

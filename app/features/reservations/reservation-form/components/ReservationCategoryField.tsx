import { INPUT_TYPES } from "@/app/constants";
import FormField from "@/app/components/form-field/FormField";
import { FORM_FIELD_VARIANT } from "@/app/components/form-field/constants/FormFieldVariant.constants";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import { RESERVATION_FORM_FIELD_ID } from "../constants/ReservationFormUi.constants";
import type { ReservationFormFieldsProps } from "../models/ReservationFormFieldsProps.interface";
import {
  RESERVATION_FORM_FIELD_CLASS,
  RESERVATION_FORM_INPUT_CLASS,
} from "../styles/ReservationFormView.styles";

const ReservationCategoryField = ({
  categories,
  viewModel,
}: ReservationFormFieldsProps): React.JSX.Element => {
  const options = categories.map((category) => ({
    key: category.id,
    label: category.name,
    value: category.id,
  }));

  return (
    <div className={RESERVATION_FORM_FIELD_CLASS}>
      <FormField
        id={RESERVATION_FORM_FIELD_ID.CATEGORY}
        name={RESERVATION_FORM_FIELD_ID.CATEGORY}
        label={RESERVATION_FORM_UI_COPY.CATEGORY}
        classNameField={RESERVATION_FORM_INPUT_CLASS}
        type={INPUT_TYPES.SELECT}
        value={viewModel.values.categoryId}
        options={options}
        placeholder={
          RESERVATION_FORM_UI_COPY.CATEGORY_PLACEHOLDER
        }
        disabled={categories.length === 0}
        onChange={(event) =>
          viewModel.handleCategoryChange(event.target.value)
        }
        error={viewModel.errors.categoryId}
        showErrorText
        variant={FORM_FIELD_VARIANT.GLASS}
      />
    </div>
  );
};

export default ReservationCategoryField;

import FormField from "@/app/components/form-field/FormField";
import { FORM_FIELD_VARIANT } from "@/app/components/form-field/constants/FormFieldVariant.constants";
import {
  AUTOCOMPLETE,
  INPUT_MODE,
  INPUT_TYPES,
  STRING,
} from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import { CATEGORY_DEPOSIT_FIELD_LABEL } from "../constants/CategoryDepositFieldLabel.constants";
import { CATEGORY_DEPOSIT_FORM_FIELD_ID } from "../constants/CategoryDepositFormFieldId.constants";
import type { CategoryDepositAmountFieldProps } from "../models/CategoryDepositAmountFieldProps.interface";

const CategoryDepositAmountField = ({
  currency,
  value,
  error,
  disabled,
  onChange,
}: CategoryDepositAmountFieldProps): React.JSX.Element => {
  const id = CATEGORY_DEPOSIT_FORM_FIELD_ID[currency];

  return (
    <FormField
      id={id}
      name={id}
      label={CATEGORY_DEPOSIT_FIELD_LABEL[currency]}
      value={value}
      type={INPUT_TYPES.TEXT}
      placeholder={
        CATEGORY_CATALOG_COPY.DEPOSIT_FIELD_PLACEHOLDER
      }
      labelSuffix={STRING.Empty}
      onChange={onChange}
      error={error}
      showErrorText
      disabled={disabled}
      variant={FORM_FIELD_VARIANT.DEFAULT}
      autoComplete={AUTOCOMPLETE.OFF}
      inputMode={INPUT_MODE.DECIMAL}
      describedBy={CATEGORY_DEPOSIT_FORM_FIELD_ID.HINT}
      spellCheck={false}
    />
  );
};

export default CategoryDepositAmountField;

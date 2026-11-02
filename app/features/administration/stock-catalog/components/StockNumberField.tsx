import FormField from "@/app/components/form-field/FormField";
import { FORM_FIELD_VARIANT } from "@/app/components/form-field/constants/FormFieldVariant.constants";
import {
  AUTOCOMPLETE,
  INPUT_MODE,
  INPUT_TYPES,
} from "@/app/constants";
import { STOCK_COUNT_FIELD_ID } from "../constants/StockCountFieldId.constants";
import type { StockNumberFieldProps } from "../models/StockNumberFieldProps.interface";

const StockNumberField = ({
  disabled,
  error,
  id,
  label,
  onChange,
  value,
}: StockNumberFieldProps): React.JSX.Element => (
  <FormField
    id={id}
    name={id}
    label={label}
    value={value}
    type={INPUT_TYPES.TEXT}
    onChange={onChange}
    error={error}
    showErrorText
    disabled={disabled}
    variant={FORM_FIELD_VARIANT.DEFAULT}
    autoComplete={AUTOCOMPLETE.OFF}
    inputMode={INPUT_MODE.NUMERIC}
    describedBy={STOCK_COUNT_FIELD_ID.HINT}
    spellCheck={false}
  />
);

export default StockNumberField;

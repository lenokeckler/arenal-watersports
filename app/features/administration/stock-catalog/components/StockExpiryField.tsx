import FormField from "@/app/components/form-field/FormField";
import { FORM_FIELD_VARIANT } from "@/app/components/form-field/constants/FormFieldVariant.constants";
import { INPUT_TYPES, STRING } from "@/app/constants";
import { STOCK_COUNT_COPY } from "../constants/StockCountCopy.constants";
import { STOCK_COUNT_FIELD_ID } from "../constants/StockCountFieldId.constants";
import type { StockExpiryFieldProps } from "../models/StockExpiryFieldProps.interface";

const StockExpiryField = ({
  disabled,
  error,
  onChange,
  value,
}: StockExpiryFieldProps): React.JSX.Element => (
  <FormField
    id={STOCK_COUNT_FIELD_ID.EXPIRY_DATE}
    name={STOCK_COUNT_FIELD_ID.EXPIRY_DATE}
    label={STOCK_COUNT_COPY.EXPIRY_DATE_LABEL}
    value={value}
    type={INPUT_TYPES.DATE}
    labelSuffix={STRING.Empty}
    onChange={onChange}
    error={error}
    showErrorText
    disabled={disabled}
    variant={FORM_FIELD_VARIANT.DEFAULT}
    describedBy={STOCK_COUNT_FIELD_ID.HINT}
  />
);

export default StockExpiryField;

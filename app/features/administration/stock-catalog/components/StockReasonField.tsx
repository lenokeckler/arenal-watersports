import FormField from "@/app/components/form-field/FormField";
import { FORM_FIELD_VARIANT } from "@/app/components/form-field/constants/FormFieldVariant.constants";
import { INPUT_TYPES, STRING } from "@/app/constants";
import { STOCK_COUNT_COPY } from "../constants/StockCountCopy.constants";
import { STOCK_COUNT_FIELD_ID } from "../constants/StockCountFieldId.constants";
import { STOCK_REASON_OPTIONS } from "../constants/StockReasonOptions.constants";
import type { StockReasonFieldProps } from "../models/StockReasonFieldProps.interface";

const StockReasonField = ({
  disabled,
  onChange,
  value,
}: StockReasonFieldProps): React.JSX.Element => (
  <FormField
    id={STOCK_COUNT_FIELD_ID.REASON}
    name={STOCK_COUNT_FIELD_ID.REASON}
    label={STOCK_COUNT_COPY.REASON_LABEL}
    value={value}
    type={INPUT_TYPES.SELECT}
    options={STOCK_REASON_OPTIONS}
    labelSuffix={STRING.Empty}
    onChange={onChange}
    disabled={disabled}
    variant={FORM_FIELD_VARIANT.DEFAULT}
    describedBy={STOCK_COUNT_FIELD_ID.HINT}
  />
);

export default StockReasonField;

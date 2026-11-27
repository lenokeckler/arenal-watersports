import FormField from "@/app/components/form-field/FormField";
import {
  AUTOCOMPLETE,
  INPUT_MODE,
  INPUT_TYPES,
  STRING,
} from "@/app/constants";
import { EXTRA_CATALOG_COPY } from "../constants/ExtraCatalogCopy.constants";
import { EXTRA_FORM_FIELD_ID } from "../constants/ExtraFormFieldId.constants";
import type { ExtraPriceFieldProps } from "../models/ExtraPriceFieldProps.interface";
import { EXTRA_FORM_PRICE_INPUT_CLASS } from "../styles/ExtraForm.styles";

const ExtraPriceField = ({
  id,
  label,
  symbol,
  currency,
  value,
  error,
  disabled,
  onChange,
}: ExtraPriceFieldProps): React.JSX.Element => (
  <FormField
    id={id}
    name={id}
    label={label}
    value={value}
    type={INPUT_TYPES.TEXT}
    placeholder={EXTRA_CATALOG_COPY.PRICE_FIELD_PLACEHOLDER}
    labelSuffix={STRING.Empty}
    onChange={onChange}
    error={error}
    showErrorText
    disabled={disabled}
    autoComplete={AUTOCOMPLETE.OFF}
    inputMode={INPUT_MODE.DECIMAL}
    describedBy={EXTRA_FORM_FIELD_ID.HINT}
    spellCheck={false}
    startAdornment={symbol}
    classNameField={EXTRA_FORM_PRICE_INPUT_CLASS[currency]}
  />
);

export default ExtraPriceField;

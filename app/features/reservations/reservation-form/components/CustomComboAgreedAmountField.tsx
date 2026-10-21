import FormField from "@/app/components/form-field/FormField";
import { FORM_FIELD_VARIANT } from "@/app/components/form-field/constants/FormFieldVariant.constants";
import { INPUT_TYPES, STRING } from "@/app/constants";
import type { CustomComboAgreedAmountFieldProps } from "../models/CustomComboAgreedAmountFieldProps.interface";
import { formatCustomComboAmount } from "../utils/formatCustomComboAmount";
import { parseCustomComboAmountInput } from "../utils/parseCustomComboAmountInput";
import { CUSTOM_COMBO_PRICE_INPUT_CLASS } from "../styles/CustomComboPricingSummary.styles";

const CustomComboAgreedAmountField = ({
  amount,
  currency,
  id,
  label,
  onChange,
  suggestedAmount,
}: CustomComboAgreedAmountFieldProps): React.JSX.Element => (
  <FormField
    classNameField={CUSTOM_COMBO_PRICE_INPUT_CLASS}
    id={id}
    label={label}
    name={id}
    onChange={(event) =>
      onChange(
        parseCustomComboAmountInput(event.target.value)
      )
    }
    placeholder={formatCustomComboAmount(
      suggestedAmount,
      currency
    )}
    type={INPUT_TYPES.NUMBER}
    value={amount?.toString() ?? STRING.Empty}
    variant={FORM_FIELD_VARIANT.GLASS}
  />
);

export default CustomComboAgreedAmountField;

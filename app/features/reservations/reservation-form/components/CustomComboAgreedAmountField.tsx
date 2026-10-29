import { useState } from "react";
import FormField from "@/app/components/form-field/FormField";
import { FORM_FIELD_VARIANT } from "@/app/components/form-field/constants/FormFieldVariant.constants";
import {
  INDEX,
  INPUT_TYPES,
  STRING,
} from "@/app/constants";
import type { CustomComboAgreedAmountFieldProps } from "../models/CustomComboAgreedAmountFieldProps.interface";
import { formatCustomComboAmount } from "../utils/formatCustomComboAmount";
import { parseCustomComboAmountInput } from "../utils/parseCustomComboAmountInput";
import { CUSTOM_COMBO_FORM_COPY } from "../constants/CustomComboFormCopy.constants";
import { CUSTOM_COMBO_PRICE_INPUT_CLASS } from "../styles/CustomComboPricingSummary.styles";

const CustomComboAgreedAmountField = ({
  amount,
  currency,
  id,
  label,
  onChange,
  suggestedAmount,
}: CustomComboAgreedAmountFieldProps): React.JSX.Element => {
  const [error, setError] = useState<string>(STRING.Empty);
  const handleChange = (
    event: React.ChangeEvent<
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement
    >
  ): void => {
    const parsedAmount = parseCustomComboAmountInput(
      event.target.value
    );
    if (
      typeof parsedAmount === "number" &&
      (!Number.isFinite(parsedAmount) ||
        parsedAmount < INDEX.ZERO)
    ) {
      setError(
        CUSTOM_COMBO_FORM_COPY.INVALID_AGREED_AMOUNT
      );
      return;
    }
    setError(STRING.Empty);
    onChange(parsedAmount);
  };

  return (
    <FormField
      classNameField={CUSTOM_COMBO_PRICE_INPUT_CLASS}
      error={error}
      id={id}
      label={label}
      name={id}
      onChange={handleChange}
      placeholder={formatCustomComboAmount(
        suggestedAmount,
        currency
      )}
      showErrorText
      type={INPUT_TYPES.NUMBER}
      value={amount?.toString() ?? STRING.Empty}
      variant={FORM_FIELD_VARIANT.GLASS}
    />
  );
};

export default CustomComboAgreedAmountField;

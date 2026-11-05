import FormField from "@/app/components/form-field/FormField";
import { FORM_FIELD_VARIANT } from "@/app/components/form-field/constants/FormFieldVariant.constants";
import { INPUT_TYPES } from "@/app/constants";
import type { CustomComboAgreedAmountFieldProps } from "../models/CustomComboAgreedAmountFieldProps.interface";
import { CUSTOM_COMBO_PRICE_INPUT_CLASS } from "../styles/CustomComboPricingSummary.styles";
import { useCustomComboAgreedAmountFieldViewModel } from "../hooks/useCustomComboAgreedAmountFieldViewModel";

const CustomComboAgreedAmountField = ({
  amount,
  currency,
  fieldError,
  id,
  label,
  onChange,
  suggestedAmount,
}: CustomComboAgreedAmountFieldProps): React.JSX.Element => {
  const viewModel =
    useCustomComboAgreedAmountFieldViewModel({
      amount,
      currency,
      fieldError,
      onChange,
      suggestedAmount,
    });

  return (
    <FormField
      classNameField={CUSTOM_COMBO_PRICE_INPUT_CLASS}
      error={viewModel.error}
      id={id}
      label={label}
      name={id}
      onChange={viewModel.handleChange}
      placeholder={viewModel.placeholder}
      showErrorText
      type={INPUT_TYPES.NUMBER}
      value={viewModel.value}
      variant={FORM_FIELD_VARIANT.GLASS}
    />
  );
};

export default CustomComboAgreedAmountField;

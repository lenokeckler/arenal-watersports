import { useState } from "react";
import type { ChangeEvent } from "react";
import { INDEX, STRING } from "@/app/constants";
import type { CustomComboAgreedAmountFieldViewModel } from "../models/CustomComboAgreedAmountFieldViewModel.interface";
import type { CustomComboAgreedAmountFieldViewModelOptions } from "../models/CustomComboAgreedAmountFieldViewModelOptions.interface";
import { formatCustomComboAmount } from "../utils/formatCustomComboAmount";
import { parseCustomComboAmountInput } from "../utils/parseCustomComboAmountInput";
import { CUSTOM_COMBO_FORM_COPY } from "../constants/CustomComboFormCopy.constants";

export const useCustomComboAgreedAmountFieldViewModel = (
  props: CustomComboAgreedAmountFieldViewModelOptions
): CustomComboAgreedAmountFieldViewModel => {
  const [error, setError] = useState<string>(STRING.Empty);
  const handleChange = (
    event: ChangeEvent<
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
    props.onChange(parsedAmount);
  };

  return {
    error: error || props.fieldError,
    handleChange,
    placeholder: formatCustomComboAmount(
      props.suggestedAmount,
      props.currency
    ),
    value: props.amount?.toString() ?? STRING.Empty,
  };
};

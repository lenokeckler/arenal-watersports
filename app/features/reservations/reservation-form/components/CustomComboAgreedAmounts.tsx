import {
  CUSTOM_COMBO_FORM_COPY,
  CUSTOM_COMBO_FORM_CURRENCY,
  CUSTOM_COMBO_FORM_INPUT_ID,
} from "../constants/CustomComboFormCopy.constants";
import type { CustomComboAgreedAmountsProps } from "../models/CustomComboAgreedAmountsProps.interface";
import { CUSTOM_COMBO_AGREED_GRID_CLASS } from "../styles/CustomComboPricingSummary.styles";
import CustomComboAgreedAmountField from "./CustomComboAgreedAmountField";

const CustomComboAgreedAmounts = ({
  viewModel,
}: CustomComboAgreedAmountsProps): React.JSX.Element => (
  <div className={CUSTOM_COMBO_AGREED_GRID_CLASS}>
    <CustomComboAgreedAmountField
      amount={viewModel.draft.agreedAmountCrc}
      currency={CUSTOM_COMBO_FORM_CURRENCY.CRC}
      id={CUSTOM_COMBO_FORM_INPUT_ID.CRC_AMOUNT}
      label={CUSTOM_COMBO_FORM_COPY.CRC_AMOUNT}
      onChange={viewModel.handleAgreedAmountCrcChange}
      suggestedAmount={
        viewModel.pricing.pricing?.listAmountCrc ?? null
      }
    />
    <CustomComboAgreedAmountField
      amount={viewModel.draft.agreedAmountUsd}
      currency={CUSTOM_COMBO_FORM_CURRENCY.USD}
      id={CUSTOM_COMBO_FORM_INPUT_ID.USD_AMOUNT}
      label={CUSTOM_COMBO_FORM_COPY.USD_AMOUNT}
      onChange={viewModel.handleAgreedAmountUsdChange}
      suggestedAmount={
        viewModel.pricing.pricing?.listAmountUsd ?? null
      }
    />
  </div>
);

export default CustomComboAgreedAmounts;

import Text from "@/app/components/text/Text";
import { CUSTOM_COMBO_FORM_CURRENCY } from "../constants/CustomComboFormCopy.constants";
import { CUSTOM_COMBO_PRICING_STATUS } from "../constants/CustomComboPricingStatus.constants";
import { formatCustomComboAmount } from "../utils/formatCustomComboAmount";
import {
  CUSTOM_COMBO_AMOUNT_CLASS,
  CUSTOM_COMBO_CURRENCY_CLASS,
  CUSTOM_COMBO_PRICING_TOTALS_CLASS,
  CUSTOM_COMBO_PRICING_TOTAL_CLASS,
} from "../styles/CustomComboPricingSummary.styles";
import type { CustomComboPriceTotalsProps } from "../models/CustomComboPriceTotalsProps.interface";
import type { CustomComboPriceTotalProps } from "../models/CustomComboPriceTotalProps.interface";

const CustomComboPriceTotal = ({
  amount,
  currency,
}: CustomComboPriceTotalProps): React.JSX.Element => (
  <div className={CUSTOM_COMBO_PRICING_TOTAL_CLASS}>
    <Text className={CUSTOM_COMBO_CURRENCY_CLASS}>
      {currency}
    </Text>
    <Text className={CUSTOM_COMBO_AMOUNT_CLASS}>
      {formatCustomComboAmount(amount, currency)}
    </Text>
  </div>
);

const CustomComboPriceTotals = ({
  pricing,
}: CustomComboPriceTotalsProps): React.JSX.Element => {
  const isReady =
    pricing.status === CUSTOM_COMBO_PRICING_STATUS.READY;
  const amountCrc = isReady
    ? (pricing.pricing?.listAmountCrc ?? null)
    : null;
  const amountUsd = isReady
    ? (pricing.pricing?.listAmountUsd ?? null)
    : null;
  return (
    <div className={CUSTOM_COMBO_PRICING_TOTALS_CLASS}>
      <CustomComboPriceTotal
        amount={amountCrc}
        currency={CUSTOM_COMBO_FORM_CURRENCY.CRC}
      />
      <CustomComboPriceTotal
        amount={amountUsd}
        currency={CUSTOM_COMBO_FORM_CURRENCY.USD}
      />
    </div>
  );
};

export default CustomComboPriceTotals;

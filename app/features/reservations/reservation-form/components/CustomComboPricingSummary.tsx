import Button from "@/app/components/button/Button";
import Section from "@/app/components/section/Section";
import Text from "@/app/components/text/Text";
import { CUSTOM_COMBO_FORM_COPY } from "../constants/CustomComboFormCopy.constants";
import { CUSTOM_COMBO_PRICING_STATUS } from "../constants/CustomComboPricingStatus.constants";
import type { CustomComboPricingSummaryProps } from "../models/CustomComboPricingSummaryProps.interface";
import { getCustomComboPricingStatusMessage } from "../utils/getCustomComboPricingStatusMessage";
import {
  CUSTOM_COMBO_PRICING_CLASS,
  CUSTOM_COMBO_PRICING_HEADER_CLASS,
  CUSTOM_COMBO_PRICING_STATUS_CLASS,
} from "../styles/CustomComboPricingSummary.styles";
import CustomComboAgreedAmounts from "./CustomComboAgreedAmounts";
import CustomComboPriceTotals from "./CustomComboPriceTotals";

const CustomComboPricingSummary = ({
  viewModel,
}: CustomComboPricingSummaryProps): React.JSX.Element => {
  const statusMessage = getCustomComboPricingStatusMessage(
    viewModel.pricing
  );
  return (
    <Section
      aria-label={CUSTOM_COMBO_FORM_COPY.PRICING_TITLE}
      className={CUSTOM_COMBO_PRICING_CLASS}
    >
      <div className={CUSTOM_COMBO_PRICING_HEADER_CLASS}>
        <Text className={CUSTOM_COMBO_PRICING_STATUS_CLASS}>
          {CUSTOM_COMBO_FORM_COPY.PRICING_TITLE}
        </Text>
        {statusMessage ? (
          <Text
            className={CUSTOM_COMBO_PRICING_STATUS_CLASS}
          >
            {statusMessage}
          </Text>
        ) : null}
      </div>
      <CustomComboPriceTotals pricing={viewModel.pricing} />
      {viewModel.pricing.status ===
      CUSTOM_COMBO_PRICING_STATUS.ERROR ? (
        <Button
          onClick={viewModel.handlePricingRetry}
          type="button"
        >
          {CUSTOM_COMBO_FORM_COPY.RETRY_PRICING}
        </Button>
      ) : null}
      <Text className={CUSTOM_COMBO_PRICING_STATUS_CLASS}>
        {CUSTOM_COMBO_FORM_COPY.AGREED_AMOUNT_HINT}
      </Text>
      <CustomComboAgreedAmounts viewModel={viewModel} />
    </Section>
  );
};

export default CustomComboPricingSummary;

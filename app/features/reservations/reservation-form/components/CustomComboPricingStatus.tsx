import Text from "@/app/components/text/Text";
import { CUSTOM_COMBO_FORM_COPY } from "../constants/CustomComboFormCopy.constants";
import type { CustomComboPricingStatusProps } from "../models/CustomComboPricingStatusProps.interface";
import { getCustomComboPricingStatusMessage } from "../utils/getCustomComboPricingStatusMessage";
import {
  CUSTOM_COMBO_PRICING_HEADER_CLASS,
  CUSTOM_COMBO_PRICING_STATUS_CLASS,
} from "../styles/CustomComboPricingSummary.styles";

const CustomComboPricingStatus = ({
  pricing,
}: CustomComboPricingStatusProps): React.JSX.Element => {
  const statusMessage =
    getCustomComboPricingStatusMessage(pricing);
  return (
    <div className={CUSTOM_COMBO_PRICING_HEADER_CLASS}>
      <Text className={CUSTOM_COMBO_PRICING_STATUS_CLASS}>
        {CUSTOM_COMBO_FORM_COPY.PRICING_TITLE}
      </Text>
      {statusMessage ? (
        <Text className={CUSTOM_COMBO_PRICING_STATUS_CLASS}>
          {statusMessage}
        </Text>
      ) : null}
    </div>
  );
};

export default CustomComboPricingStatus;

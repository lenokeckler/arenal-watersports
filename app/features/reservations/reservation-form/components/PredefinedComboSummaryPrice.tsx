import Text from "@/app/components/text/Text";
import { PREDEFINED_COMBO_FORM_COPY } from "../constants/PredefinedComboFormCopy.constants";
import type { PredefinedComboSummaryContentProps } from "../models/PredefinedComboSummaryContentProps.interface";
import {
  PREDEFINED_COMBO_PRICE_AMOUNT_CLASS,
  PREDEFINED_COMBO_PRICE_CLASS,
  PREDEFINED_COMBO_PRICE_LABEL_CLASS,
} from "../styles/PredefinedComboSummary.styles";
import { formatCustomComboAmount } from "../utils/formatCustomComboAmount";

const PredefinedComboSummaryPrice = ({
  combo,
}: PredefinedComboSummaryContentProps): React.JSX.Element => (
  <div className={PREDEFINED_COMBO_PRICE_CLASS}>
    <Text className={PREDEFINED_COMBO_PRICE_LABEL_CLASS}>
      {PREDEFINED_COMBO_FORM_COPY.PACKAGE_PRICE}
    </Text>
    <Text className={PREDEFINED_COMBO_PRICE_AMOUNT_CLASS}>
      {formatCustomComboAmount(
        combo.packagePrice,
        combo.currency
      )}
    </Text>
  </div>
);

export default PredefinedComboSummaryPrice;

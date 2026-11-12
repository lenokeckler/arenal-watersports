import InlineText from "@/app/components/text/InlineText";
import Text from "@/app/components/text/Text";
import { PREDEFINED_COMBO_FORM_COPY } from "../constants/PredefinedComboFormCopy.constants";
import type { PredefinedComboSummaryContentProps } from "../models/PredefinedComboSummaryContentProps.interface";
import {
  PREDEFINED_COMBO_SUMMARY_ITEM_CLASS,
  PREDEFINED_COMBO_SUMMARY_LIST_CLASS,
} from "../styles/PredefinedComboSummary.styles";

const PredefinedComboSummaryItems = ({
  combo,
}: PredefinedComboSummaryContentProps): React.JSX.Element => (
  <div
    aria-label={PREDEFINED_COMBO_FORM_COPY.ITEM_COUNT}
    className={PREDEFINED_COMBO_SUMMARY_LIST_CLASS}
    role="list"
  >
    {combo.items.map((item) => (
      <div
        className={PREDEFINED_COMBO_SUMMARY_ITEM_CLASS}
        key={item.categoryId}
        role="listitem"
      >
        <Text>{item.categoryName}</Text>
        <InlineText>
          {`${item.quantity} ${item.quantity === 1 ? PREDEFINED_COMBO_FORM_COPY.ITEM_COUNT_SINGLE : PREDEFINED_COMBO_FORM_COPY.ITEM_COUNT}`}
        </InlineText>
      </div>
    ))}
  </div>
);

export default PredefinedComboSummaryItems;

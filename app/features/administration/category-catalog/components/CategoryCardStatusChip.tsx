import InlineText from "@/app/components/text/InlineText";
import { CATEGORY_STATUS_LABEL } from "../constants/CategoryStatusLabel.constants";
import type { CategoryCardStatusChipProps } from "../models/CategoryCardStatusChipProps.interface";
import {
  CATEGORY_CARD_STATUS_CHIP_CLASS,
  CATEGORY_CARD_STATUS_DOT_CLASS,
} from "../styles/CategoryCardStatusChip.styles";

const CategoryCardStatusChip = ({
  status,
}: CategoryCardStatusChipProps): React.JSX.Element => (
  <div className={CATEGORY_CARD_STATUS_CHIP_CLASS[status]}>
    <div
      aria-hidden="true"
      className={CATEGORY_CARD_STATUS_DOT_CLASS[status]}
    />
    <InlineText>{CATEGORY_STATUS_LABEL[status]}</InlineText>
  </div>
);

export default CategoryCardStatusChip;

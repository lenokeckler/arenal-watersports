import InlineText from "@/app/components/text/InlineText";
import { COMBO_STATUS_LABEL } from "../constants/ComboStatusLabel.constants";
import type { ComboCardStatusChipProps } from "../models/ComboCardStatusChipProps.interface";
import {
  COMBO_CARD_STATUS_CHIP_CLASS,
  COMBO_CARD_STATUS_DOT_CLASS,
} from "../styles/ComboCard.styles";

const ComboCardStatusChip = ({
  status,
}: ComboCardStatusChipProps): React.JSX.Element => (
  <InlineText
    className={COMBO_CARD_STATUS_CHIP_CLASS[status]}
  >
    <span
      aria-hidden="true"
      className={COMBO_CARD_STATUS_DOT_CLASS}
    />
    {COMBO_STATUS_LABEL[status]}
  </InlineText>
);

export default ComboCardStatusChip;

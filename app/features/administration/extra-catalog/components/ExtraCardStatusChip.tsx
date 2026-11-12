import InlineText from "@/app/components/text/InlineText";
import { EXTRA_STATUS_LABEL } from "../constants/ExtraStatusLabel.constants";
import type { ExtraCardStatusChipProps } from "../models/ExtraCardStatusChipProps.interface";
import {
  EXTRA_CARD_STATUS_CHIP_CLASS,
  EXTRA_CARD_STATUS_DOT_CLASS,
} from "../styles/ExtraCard.styles";

const ExtraCardStatusChip = ({
  status,
}: ExtraCardStatusChipProps): React.JSX.Element => (
  <div className={EXTRA_CARD_STATUS_CHIP_CLASS[status]}>
    <div
      aria-hidden="true"
      className={EXTRA_CARD_STATUS_DOT_CLASS[status]}
    />
    <InlineText>{EXTRA_STATUS_LABEL[status]}</InlineText>
  </div>
);

export default ExtraCardStatusChip;

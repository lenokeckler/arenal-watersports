import { InlineText } from "@/app/components";
import { EQUIPMENT_BOARD_COPY } from "../constants/EquipmentBoardCopy.constants";
import {
  BOARD_CARD_UNIT_CHIP_CLASS,
  BOARD_CARD_UNIT_CHIP_LONG_CLASS,
  BOARD_CARD_UNIT_CHIP_SHORT_CLASS,
} from "../styles/BoardCard.styles";

const BoardCardUnitChip = (): React.JSX.Element => (
  <InlineText className={BOARD_CARD_UNIT_CHIP_CLASS}>
    <InlineText
      className={BOARD_CARD_UNIT_CHIP_SHORT_CLASS}
    >
      {EQUIPMENT_BOARD_COPY.PER_UNIT_CHIP_SHORT}
    </InlineText>
    <InlineText className={BOARD_CARD_UNIT_CHIP_LONG_CLASS}>
      {EQUIPMENT_BOARD_COPY.PER_UNIT_CHIP}
    </InlineText>
  </InlineText>
);

export default BoardCardUnitChip;

import { InlineText, Title } from "@/app/components";
import { TitleVariant } from "@/app/constants";
import { EQUIPMENT_BOARD_COPY } from "../constants/EquipmentBoardCopy.constants";
import type { BoardCardProps } from "../models/BoardCardProps.interface";
import {
  BOARD_CARD_CHIPS_CLASS,
  BOARD_CARD_FREE_CHIP_CLASS,
  BOARD_CARD_LABEL_CLASS,
  BOARD_CARD_MEDIA_CLASS,
  BOARD_CARD_NAME_CLASS,
  BOARD_CARD_UNIT_CHIP_CLASS,
} from "../styles/BoardCard.styles";
import { computeFreePercent } from "../utils/computeFreePercent";
import { resolveFreeOfTotalText } from "../utils/resolveFreeOfTotalText";
import BoardCardFreeBar from "./BoardCardFreeBar";
import BoardCardImage from "./BoardCardImage";

const BoardCardMedia = ({
  card,
}: BoardCardProps): React.JSX.Element => (
  <div className={BOARD_CARD_MEDIA_CLASS}>
    <BoardCardImage label={card.label} />
    <div className={BOARD_CARD_CHIPS_CLASS}>
      <InlineText className={BOARD_CARD_UNIT_CHIP_CLASS}>
        {EQUIPMENT_BOARD_COPY.PER_UNIT_CHIP}
      </InlineText>
      <InlineText className={BOARD_CARD_FREE_CHIP_CLASS}>
        {resolveFreeOfTotalText(
          card.freeCount,
          card.totalCount
        )}
      </InlineText>
    </div>
    <div className={BOARD_CARD_NAME_CLASS}>
      <Title
        variant={TitleVariant.SECONDARY}
        text={card.label}
        className={BOARD_CARD_LABEL_CLASS}
      />
      <BoardCardFreeBar
        percent={computeFreePercent(
          card.freeCount,
          card.totalCount
        )}
      />
    </div>
  </div>
);

export default BoardCardMedia;

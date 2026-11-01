import { Text } from "@/app/components";
import { EQUIPMENT_BOARD_COPY } from "../constants/EquipmentBoardCopy.constants";
import type { BoardCardProps } from "../models/BoardCardProps.interface";
import {
  BOARD_CARD_BODY_CLASS,
  BOARD_CARD_CLASS,
  BOARD_CARD_USAGE_CLASS,
} from "../styles/BoardCard.styles";
import { computeFreePercent } from "../utils/computeFreePercent";
import BoardCardCategoryLines from "./BoardCardCategoryLines";
import BoardCardFreeBar from "./BoardCardFreeBar";
import BoardCardMedia from "./BoardCardMedia";

const BoardCard = ({
  card,
}: BoardCardProps): React.JSX.Element => (
  <div className={BOARD_CARD_CLASS}>
    <BoardCardMedia card={card} />
    <div className={BOARD_CARD_BODY_CLASS}>
      <BoardCardFreeBar
        percent={computeFreePercent(
          card.freeCount,
          card.totalCount
        )}
      />
      <Text className={BOARD_CARD_USAGE_CLASS}>
        {EQUIPMENT_BOARD_COPY.IN_USE_OF_TOTAL(
          card.inUseCount,
          card.totalCount
        )}
      </Text>
      {card.isGrouped && (
        <BoardCardCategoryLines
          categories={card.categories}
        />
      )}
    </div>
  </div>
);

export default BoardCard;

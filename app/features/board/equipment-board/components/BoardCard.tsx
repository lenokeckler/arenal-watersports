import { InlineText, Text, Title } from "@/app/components";
import { STRING, TitleVariant } from "@/app/constants";
import { EQUIPMENT_BOARD_COPY } from "../constants/EquipmentBoardCopy.constants";
import type { BoardCardProps } from "../models/BoardCardProps.interface";
import {
  BOARD_CARD_CLASS,
  BOARD_CARD_FREE_CLASS,
  BOARD_CARD_FREE_LABEL_CLASS,
  BOARD_CARD_LABEL_CLASS,
  BOARD_CARD_USAGE_CLASS,
} from "../styles/BoardCard.styles";
import { resolveFreeLabel } from "../utils/resolveFreeLabel";
import { computeOccupancyPercent } from "../utils/computeOccupancyPercent";
import BoardCardCategoryLines from "./BoardCardCategoryLines";
import BoardCardOccupancyBar from "./BoardCardOccupancyBar";

const BoardCard = ({
  card,
}: BoardCardProps): React.JSX.Element => (
  <div className={BOARD_CARD_CLASS}>
    <Title
      variant={TitleVariant.SECONDARY}
      text={card.label}
      className={BOARD_CARD_LABEL_CLASS}
    />
    <Text className={BOARD_CARD_FREE_CLASS}>
      {card.freeCount}
      {STRING.SPACE}
      <InlineText className={BOARD_CARD_FREE_LABEL_CLASS}>
        {resolveFreeLabel(card.freeCount)}
      </InlineText>
    </Text>
    <Text className={BOARD_CARD_USAGE_CLASS}>
      {EQUIPMENT_BOARD_COPY.IN_USE_OF_TOTAL(
        card.inUseCount,
        card.totalCount
      )}
    </Text>
    <BoardCardOccupancyBar
      percent={computeOccupancyPercent(
        card.inUseCount,
        card.totalCount
      )}
    />
    {card.isGrouped && (
      <BoardCardCategoryLines
        categories={card.categories}
      />
    )}
  </div>
);

export default BoardCard;

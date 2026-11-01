import { InlineText, Text } from "@/app/components";
import { ARIA_ROLE, STRING } from "@/app/constants";
import { EQUIPMENT_BOARD_COPY } from "../constants/EquipmentBoardCopy.constants";
import type { BoardCardCategoryLinesProps } from "../models/BoardCardCategoryLinesProps.interface";
import {
  BOARD_CARD_LINE_CLASS,
  BOARD_CARD_LINE_FREE_CLASS,
  BOARD_CARD_LINE_NAME_CLASS,
  BOARD_CARD_LINE_STATS_CLASS,
  BOARD_CARD_LINES_CLASS,
  BOARD_CARD_USAGE_CLASS,
} from "../styles/BoardCard.styles";
import { resolveFreeLabel } from "../utils/resolveFreeLabel";

const BoardCardCategoryLines = ({
  categories,
}: BoardCardCategoryLinesProps): React.JSX.Element => (
  <div
    role={ARIA_ROLE.LIST}
    className={BOARD_CARD_LINES_CLASS}
  >
    {categories.map((category) => (
      <div
        key={category.id}
        role={ARIA_ROLE.LISTITEM}
        className={BOARD_CARD_LINE_CLASS}
      >
        <Text className={BOARD_CARD_LINE_NAME_CLASS}>
          {category.name}
        </Text>
        <div className={BOARD_CARD_LINE_STATS_CLASS}>
          <Text className={BOARD_CARD_LINE_FREE_CLASS}>
            {category.freeCount}
            {STRING.SPACE}
            <InlineText>
              {resolveFreeLabel(category.freeCount)}
            </InlineText>
          </Text>
          <Text className={BOARD_CARD_USAGE_CLASS}>
            {EQUIPMENT_BOARD_COPY.IN_USE_OF_TOTAL(
              category.inUseCount,
              category.totalCount
            )}
          </Text>
        </div>
      </div>
    ))}
  </div>
);

export default BoardCardCategoryLines;

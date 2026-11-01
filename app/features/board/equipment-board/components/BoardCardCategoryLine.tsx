import { InlineText, Text } from "@/app/components";
import { ARIA_ROLE, STRING } from "@/app/constants";
import type { BoardCardCategoryLineProps } from "../models/BoardCardCategoryLineProps.interface";
import {
  BOARD_CARD_LINE_CLASS,
  BOARD_CARD_LINE_FREE_CLASS,
  BOARD_CARD_LINE_NAME_CLASS,
} from "../styles/BoardCard.styles";
import { resolveFreeLabel } from "../utils/resolveFreeLabel";

const BoardCardCategoryLine = ({
  category,
}: BoardCardCategoryLineProps): React.JSX.Element => (
  <div
    role={ARIA_ROLE.LISTITEM}
    className={BOARD_CARD_LINE_CLASS}
  >
    <Text className={BOARD_CARD_LINE_NAME_CLASS}>
      {category.name}
    </Text>
    <Text className={BOARD_CARD_LINE_FREE_CLASS}>
      {category.freeCount}
      {STRING.SPACE}
      <InlineText>
        {resolveFreeLabel(category.freeCount)}
      </InlineText>
    </Text>
  </div>
);

export default BoardCardCategoryLine;

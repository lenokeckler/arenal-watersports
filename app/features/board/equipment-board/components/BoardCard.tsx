import { Link } from "@/app/components";
import { BOARD_UNIT_FILTER } from "@/app/constants";
import { resolveBoardCategoryPath } from "@/app/utils/board-paths/resolveBoardCategoryPath";
import { resolveBoardFilterHref } from "@/app/utils/board-unit-filter/resolveBoardFilterHref";
import type { BoardCardProps } from "../models/BoardCardProps.interface";
import {
  BOARD_CARD_EMPTY_CLASS,
  BOARD_CARD_INTERACTIVE_CLASS,
  BOARD_CARD_LINK_CLASS,
} from "../styles/BoardCard.styles";
import { resolveBoardCardCount } from "../utils/resolveBoardCardCount";
import BoardCardMedia from "./BoardCardMedia";

const BoardCard = ({
  card,
  filter,
  isPriorityImage,
}: BoardCardProps): React.JSX.Element => {
  const isEmptyForFilter =
    filter !== BOARD_UNIT_FILTER.ALL &&
    resolveBoardCardCount(card, filter) === 0;

  if (isEmptyForFilter) {
    return (
      <div className={BOARD_CARD_EMPTY_CLASS}>
        <BoardCardMedia
          card={card}
          filter={filter}
          isPriorityImage={isPriorityImage}
        />
      </div>
    );
  }

  return (
    <div className={BOARD_CARD_INTERACTIVE_CLASS}>
      <BoardCardMedia
        card={card}
        filter={filter}
        isPriorityImage={isPriorityImage}
      />
      <Link
        href={resolveBoardFilterHref(
          resolveBoardCategoryPath(card.targetCategoryId),
          filter
        )}
        ariaLabel={card.label}
        className={BOARD_CARD_LINK_CLASS}
      />
    </div>
  );
};

export default BoardCard;

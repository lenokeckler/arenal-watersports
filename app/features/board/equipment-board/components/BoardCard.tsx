import { Link } from "@/app/components";
import { resolveBoardCategoryPath } from "@/app/utils/board-paths/resolveBoardCategoryPath";
import type { BoardCardProps } from "../models/BoardCardProps.interface";
import {
  BOARD_CARD_INTERACTIVE_CLASS,
  BOARD_CARD_LINK_CLASS,
} from "../styles/BoardCard.styles";
import BoardCardMedia from "./BoardCardMedia";

const BoardCard = ({
  card,
  isPriorityImage,
}: BoardCardProps): React.JSX.Element => (
  <div className={BOARD_CARD_INTERACTIVE_CLASS}>
    <BoardCardMedia
      card={card}
      isPriorityImage={isPriorityImage}
    />
    <Link
      href={resolveBoardCategoryPath(card.targetCategoryId)}
      ariaLabel={card.label}
      className={BOARD_CARD_LINK_CLASS}
    />
  </div>
);

export default BoardCard;

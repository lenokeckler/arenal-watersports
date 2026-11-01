import type { BoardCardProps } from "../models/BoardCardProps.interface";
import { BOARD_CARD_CLASS } from "../styles/BoardCard.styles";
import BoardCardCategoryLines from "./BoardCardCategoryLines";
import BoardCardMedia from "./BoardCardMedia";

const BoardCard = ({
  card,
}: BoardCardProps): React.JSX.Element => (
  <div className={BOARD_CARD_CLASS}>
    <BoardCardMedia card={card} />
    {card.isGrouped && (
      <BoardCardCategoryLines
        categories={card.categories}
      />
    )}
  </div>
);

export default BoardCard;

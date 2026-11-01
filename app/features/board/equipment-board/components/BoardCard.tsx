import type { BoardCardProps } from "../models/BoardCardProps.interface";
import { BOARD_CARD_CLASS } from "../styles/BoardCard.styles";
import BoardCardCategoryLines from "./BoardCardCategoryLines";
import BoardCardMedia from "./BoardCardMedia";
import BoardCardToggle from "./BoardCardToggle";

const BoardCard = ({
  card,
}: BoardCardProps): React.JSX.Element => (
  <div className={BOARD_CARD_CLASS}>
    {card.isGrouped ? (
      <BoardCardToggle
        label={card.label}
        panel={
          <BoardCardCategoryLines
            categories={card.categories}
          />
        }
      >
        <BoardCardMedia card={card} />
      </BoardCardToggle>
    ) : (
      <BoardCardMedia card={card} />
    )}
  </div>
);

export default BoardCard;

import type { BoardCardProps } from "../models/BoardCardProps.interface";
import { BOARD_CARD_CLASS } from "../styles/BoardCard.styles";
import BoardCardMedia from "./BoardCardMedia";

const BoardCard = ({
  card,
}: BoardCardProps): React.JSX.Element => (
  <div className={BOARD_CARD_CLASS}>
    <BoardCardMedia card={card} />
  </div>
);

export default BoardCard;

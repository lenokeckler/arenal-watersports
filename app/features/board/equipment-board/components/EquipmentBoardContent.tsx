import {
  ARIA_ROLE,
  DEFAULT_BOARD_LAYOUT,
} from "@/app/constants";
import { EQUIPMENT_BOARD_COPY } from "../constants/EquipmentBoardCopy.constants";
import type { EquipmentBoardContentProps } from "../models/EquipmentBoardContentProps.interface";
import {
  EQUIPMENT_BOARD_GRID_CLASS,
  resolveEquipmentBoardGridItemClassName,
} from "../styles/EquipmentBoard.styles";
import { resolveBoardCardImage } from "../utils/resolveBoardCardImage";
import BoardCard from "./BoardCard";

const EquipmentBoardContent = ({
  cards,
  columns = DEFAULT_BOARD_LAYOUT.columns,
}: EquipmentBoardContentProps): React.JSX.Element => {
  const firstCardWithImage = cards.find(
    (card) => resolveBoardCardImage(card) !== null
  );

  return (
    <div
      role={ARIA_ROLE.LIST}
      aria-label={EQUIPMENT_BOARD_COPY.GRID_LABEL}
      className={EQUIPMENT_BOARD_GRID_CLASS}
    >
      {cards.map((card) => (
        <div
          key={card.id}
          role={ARIA_ROLE.LISTITEM}
          className={resolveEquipmentBoardGridItemClassName(
            columns
          )}
        >
          <BoardCard
            card={card}
            isPriorityImage={
              card.id === firstCardWithImage?.id
            }
          />
        </div>
      ))}
    </div>
  );
};

export default EquipmentBoardContent;

import { Text } from "@/app/components";
import {
  ARIA_ROLE,
  DEFAULT_BOARD_LAYOUT,
} from "@/app/constants";
import { EQUIPMENT_BOARD_COPY } from "../constants/EquipmentBoardCopy.constants";
import type { EquipmentBoardContentProps } from "../models/EquipmentBoardContentProps.interface";
import {
  EQUIPMENT_BOARD_DRAG_HINT_CLASS,
  EQUIPMENT_BOARD_GRID_CLASS,
  resolveEquipmentBoardGridItemClassName,
} from "../styles/EquipmentBoard.styles";
import { resolveBoardCardImage } from "../utils/resolveBoardCardImage";
import BoardCard from "./BoardCard";

const MIN_CARDS_TO_REORDER = 2;

const EquipmentBoardContent = ({
  cards,
  columns = DEFAULT_BOARD_LAYOUT.columns,
  drag,
  filter,
}: EquipmentBoardContentProps): React.JSX.Element => {
  const firstCardWithImage = cards.find(
    (card) => resolveBoardCardImage(card) !== null
  );
  const canReorder =
    drag !== undefined &&
    cards.length >= MIN_CARDS_TO_REORDER;

  return (
    <>
      {canReorder ? (
        <Text className={EQUIPMENT_BOARD_DRAG_HINT_CLASS}>
          {EQUIPMENT_BOARD_COPY.DRAG_HINT}
        </Text>
      ) : null}
      <div
        ref={drag?.gridRef}
        role={ARIA_ROLE.LIST}
        aria-label={EQUIPMENT_BOARD_COPY.GRID_LABEL}
        className={EQUIPMENT_BOARD_GRID_CLASS}
      >
        {cards.map((card) => (
          <div
            key={card.id}
            role={ARIA_ROLE.LISTITEM}
            className={resolveEquipmentBoardGridItemClassName(
              columns,
              drag?.draggedId === card.id
            )}
            {...drag?.getItemDragProps(card.id)}
          >
            <BoardCard
              card={card}
              filter={filter}
              isPriorityImage={
                card.id === firstCardWithImage?.id
              }
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default EquipmentBoardContent;

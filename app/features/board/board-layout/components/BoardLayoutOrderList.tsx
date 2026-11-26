import { Text } from "@/app/components";
import { ARIA_ROLE } from "@/app/constants";
import { BOARD_LAYOUT_COPY } from "../constants/BoardLayoutCopy.constants";
import { useBoardLayoutOrderListViewModel } from "../hooks/useBoardLayoutOrderListViewModel";
import type { BoardLayoutOrderListProps } from "../models/BoardLayoutOrderListProps.interface";
import {
  BOARD_LAYOUT_HINT_CLASS,
  BOARD_LAYOUT_LABEL_CLASS,
  BOARD_LAYOUT_ORDER_LIST_CLASS,
} from "../styles/BoardLayoutControls.styles";
import BoardLayoutOrderItem from "./BoardLayoutOrderItem";

const BoardLayoutOrderList = ({
  cards,
  onMove,
}: BoardLayoutOrderListProps): React.JSX.Element => {
  const { draggedId, getHandleProps, listRef } =
    useBoardLayoutOrderListViewModel({ cards, onMove });

  return (
    <>
      <Text className={BOARD_LAYOUT_LABEL_CLASS}>
        {BOARD_LAYOUT_COPY.ORDER_LABEL}
      </Text>
      <Text className={BOARD_LAYOUT_HINT_CLASS}>
        {BOARD_LAYOUT_COPY.ORDER_HINT}
      </Text>
      <div
        ref={listRef}
        role={ARIA_ROLE.LIST}
        aria-label={BOARD_LAYOUT_COPY.ORDER_LABEL}
        className={BOARD_LAYOUT_ORDER_LIST_CLASS}
      >
        {cards.map((card, index) => (
          <BoardLayoutOrderItem
            key={card.id}
            card={card}
            isDragged={draggedId === card.id}
            handleProps={getHandleProps(card.id, index)}
          />
        ))}
      </div>
    </>
  );
};

export default BoardLayoutOrderList;

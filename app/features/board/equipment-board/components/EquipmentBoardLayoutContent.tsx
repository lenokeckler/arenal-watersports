"use client";

import { useBoardCardDragViewModel } from "../hooks/useBoardCardDragViewModel";
import { useBoardLayoutViewModel } from "../hooks/useBoardLayoutViewModel";
import type { EquipmentBoardLayoutContentProps } from "../models/EquipmentBoardLayoutContentProps.interface";
import EquipmentBoardContent from "./EquipmentBoardContent";

const EquipmentBoardLayoutContent = ({
  cards,
}: EquipmentBoardLayoutContentProps): React.JSX.Element => {
  const { columns, orderedCards } =
    useBoardLayoutViewModel(cards);
  const drag = useBoardCardDragViewModel(orderedCards);

  return (
    <EquipmentBoardContent
      cards={orderedCards}
      columns={columns}
      drag={drag}
    />
  );
};

export default EquipmentBoardLayoutContent;

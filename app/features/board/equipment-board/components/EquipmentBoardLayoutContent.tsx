"use client";

import { useBoardLayoutViewModel } from "../hooks/useBoardLayoutViewModel";
import type { EquipmentBoardLayoutContentProps } from "../models/EquipmentBoardLayoutContentProps.interface";
import EquipmentBoardContent from "./EquipmentBoardContent";

const EquipmentBoardLayoutContent = ({
  cards,
}: EquipmentBoardLayoutContentProps): React.JSX.Element => {
  const { columns, orderedCards } =
    useBoardLayoutViewModel(cards);

  return (
    <EquipmentBoardContent
      cards={orderedCards}
      columns={columns}
    />
  );
};

export default EquipmentBoardLayoutContent;

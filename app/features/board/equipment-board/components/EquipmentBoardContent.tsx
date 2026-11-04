import { ARIA_ROLE } from "@/app/constants";
import { EQUIPMENT_BOARD_COPY } from "../constants/EquipmentBoardCopy.constants";
import type { EquipmentBoardContentProps } from "../models/EquipmentBoardContentProps.interface";
import {
  EQUIPMENT_BOARD_GRID_CLASS,
  EQUIPMENT_BOARD_GRID_ITEM_CLASS,
} from "../styles/EquipmentBoard.styles";
import BoardCard from "./BoardCard";

const EquipmentBoardContent = ({
  cards,
}: EquipmentBoardContentProps): React.JSX.Element => (
  <div
    role={ARIA_ROLE.LIST}
    aria-label={EQUIPMENT_BOARD_COPY.GRID_LABEL}
    className={EQUIPMENT_BOARD_GRID_CLASS}
  >
    {cards.map((card) => (
      <div
        key={card.id}
        role={ARIA_ROLE.LISTITEM}
        className={EQUIPMENT_BOARD_GRID_ITEM_CLASS}
      >
        <BoardCard card={card} />
      </div>
    ))}
  </div>
);

export default EquipmentBoardContent;

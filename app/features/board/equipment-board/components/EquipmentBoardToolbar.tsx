import BoardUnitFilter from "@/app/components/board-unit-filter/BoardUnitFilter";
import { PATHS } from "@/app/constants";
import type { EquipmentBoardToolbarProps } from "../models/EquipmentBoardToolbarProps.interface";
import { EQUIPMENT_BOARD_TOOLBAR_CLASS } from "../styles/EquipmentBoard.styles";
import { buildBoardUnitCounts } from "../utils/buildBoardUnitCounts";
import EquipmentBoardPendingLink from "./EquipmentBoardPendingLink";
import type { JSX } from "react";

const EquipmentBoardToolbar = ({
  cards,
  filter,
  pendingDispatch,
}: EquipmentBoardToolbarProps): JSX.Element => (
  <div className={EQUIPMENT_BOARD_TOOLBAR_CLASS}>
    {pendingDispatch?.isVisible && (
      <EquipmentBoardPendingLink
        pendingDispatch={pendingDispatch}
      />
    )}
    {cards.length > 0 && (
      <BoardUnitFilter
        basePath={PATHS.BOARD}
        counts={buildBoardUnitCounts(cards)}
        current={filter}
      />
    )}
  </div>
);

export default EquipmentBoardToolbar;

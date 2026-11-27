import {
  BOARD_REALTIME,
  BOARD_UNIT_FILTER,
} from "@/app/constants";
import BoardRealtime from "@/app/components/board-realtime/BoardRealtime";
import { readBoardCategories } from "@/app/services/board";
import EquipmentBoardLayoutContent from "./components/EquipmentBoardLayoutContent";
import EquipmentBoardEmpty from "./components/EquipmentBoardEmpty";
import EquipmentBoardHeader from "./components/EquipmentBoardHeader";
import EquipmentBoardToolbar from "./components/EquipmentBoardToolbar";
import type { EquipmentBoardProps } from "./models/EquipmentBoardProps.interface";
import { EQUIPMENT_BOARD_PAGE_CLASS } from "./styles/EquipmentBoard.styles";
import { buildBoardCards } from "./utils/buildBoardCards";
import { mapBoardCategoryRow } from "./utils/mapBoardCategoryRow";

const EquipmentBoard = async ({
  filter = BOARD_UNIT_FILTER.ALL,
  equipmentPending = null,
  pendingDispatch,
}: EquipmentBoardProps = {}): Promise<React.JSX.Element> => {
  const rows = await readBoardCategories();
  const cards = buildBoardCards(
    rows.map(mapBoardCategoryRow)
  );

  return (
    <main className={EQUIPMENT_BOARD_PAGE_CLASS}>
      <EquipmentBoardHeader
        equipmentPending={equipmentPending}
        showEquipment={pendingDispatch?.isVisible ?? false}
      />
      <BoardRealtime
        channelName={BOARD_REALTIME.CHANNEL.EQUIPMENT_BOARD}
      />
      <EquipmentBoardToolbar
        cards={cards}
        filter={filter}
        pendingDispatch={pendingDispatch}
      />
      {cards.length === 0 ? (
        <EquipmentBoardEmpty />
      ) : (
        <EquipmentBoardLayoutContent
          cards={cards}
          filter={filter}
        />
      )}
    </main>
  );
};

export default EquipmentBoard;

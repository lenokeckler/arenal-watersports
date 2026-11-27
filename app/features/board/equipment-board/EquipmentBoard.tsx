import {
  BOARD_REALTIME,
  BOARD_UNIT_FILTER,
  PATHS,
} from "@/app/constants";
import BoardUnitFilter from "@/app/components/board-unit-filter/BoardUnitFilter";
import BoardRealtime from "@/app/components/board-realtime/BoardRealtime";
import { readBoardCategories } from "@/app/services/board";
import EquipmentBoardLayoutContent from "./components/EquipmentBoardLayoutContent";
import EquipmentBoardEmpty from "./components/EquipmentBoardEmpty";
import EquipmentBoardHeader from "./components/EquipmentBoardHeader";
import EquipmentBoardPendingLink from "./components/EquipmentBoardPendingLink";
import type { EquipmentBoardProps } from "./models/EquipmentBoardProps.interface";
import {
  EQUIPMENT_BOARD_PAGE_CLASS,
  EQUIPMENT_BOARD_TOOLBAR_CLASS,
} from "./styles/EquipmentBoard.styles";
import { buildBoardCards } from "./utils/buildBoardCards";
import { buildBoardUnitCounts } from "./utils/buildBoardUnitCounts";
import { mapBoardCategoryRow } from "./utils/mapBoardCategoryRow";

const EquipmentBoard = async ({
  filter = BOARD_UNIT_FILTER.ALL,
  pendingDispatch,
}: EquipmentBoardProps = {}): Promise<React.JSX.Element> => {
  const rows = await readBoardCategories();
  const cards = buildBoardCards(
    rows.map(mapBoardCategoryRow)
  );

  return (
    <main className={EQUIPMENT_BOARD_PAGE_CLASS}>
      <EquipmentBoardHeader />
      <BoardRealtime
        channelName={BOARD_REALTIME.CHANNEL.EQUIPMENT_BOARD}
      />
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

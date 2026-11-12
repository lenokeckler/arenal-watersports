import { BOARD_REALTIME } from "@/app/constants";
import BoardRealtime from "@/app/components/board-realtime/BoardRealtime";
import { readBoardCategories } from "@/app/services/board";
import EquipmentBoardContent from "./components/EquipmentBoardContent";
import EquipmentBoardEmpty from "./components/EquipmentBoardEmpty";
import EquipmentBoardHeader from "./components/EquipmentBoardHeader";
import { EQUIPMENT_BOARD_PAGE_CLASS } from "./styles/EquipmentBoard.styles";
import { buildBoardCards } from "./utils/buildBoardCards";
import { mapBoardCategoryRow } from "./utils/mapBoardCategoryRow";

const EquipmentBoard =
  async (): Promise<React.JSX.Element> => {
    const rows = await readBoardCategories();
    const cards = buildBoardCards(
      rows.map(mapBoardCategoryRow)
    );

    return (
      <main className={EQUIPMENT_BOARD_PAGE_CLASS}>
        <EquipmentBoardHeader />
        <BoardRealtime
          channelName={
            BOARD_REALTIME.CHANNEL.EQUIPMENT_BOARD
          }
        />
        {cards.length === 0 ? (
          <EquipmentBoardEmpty />
        ) : (
          <EquipmentBoardContent cards={cards} />
        )}
      </main>
    );
  };

export default EquipmentBoard;

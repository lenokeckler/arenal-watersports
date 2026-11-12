import { readBoardCategories } from "@/app/services/board";
import EquipmentBoardContent from "./components/EquipmentBoardContent";
import EquipmentBoardEmpty from "./components/EquipmentBoardEmpty";
import EquipmentBoardHeader from "./components/EquipmentBoardHeader";
import EquipmentBoardRealtime from "./EquipmentBoardRealtime";
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
        <EquipmentBoardRealtime />
        {cards.length === 0 ? (
          <EquipmentBoardEmpty />
        ) : (
          <EquipmentBoardContent cards={cards} />
        )}
      </main>
    );
  };

export default EquipmentBoard;

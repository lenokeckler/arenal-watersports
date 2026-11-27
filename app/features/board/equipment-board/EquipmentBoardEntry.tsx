import { ensureWorkModeChosen } from "@/app/services/work-mode/ensureWorkModeChosen";
import { getBoardPendingDispatch } from "@/app/services/operations/getBoardPendingDispatch";
import { parseBoardUnitFilter } from "@/app/utils/board-unit-filter/parseBoardUnitFilter";
import EquipmentBoard from "./EquipmentBoard";
import type { EquipmentBoardEntryProps } from "./models/EquipmentBoardEntryProps.interface";

const EquipmentBoardEntry = async ({
  statusParam,
}: EquipmentBoardEntryProps = {}): Promise<React.JSX.Element> => {
  await ensureWorkModeChosen();

  return (
    <EquipmentBoard
      filter={parseBoardUnitFilter(statusParam)}
      pendingDispatch={await getBoardPendingDispatch()}
    />
  );
};

export default EquipmentBoardEntry;

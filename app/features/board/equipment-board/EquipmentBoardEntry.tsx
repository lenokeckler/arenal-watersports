import { ensureWorkModeChosen } from "@/app/services/work-mode/ensureWorkModeChosen";
import { getBoardPendingDispatch } from "@/app/services/operations/getBoardPendingDispatch";
import { getBoardEquipmentPending } from "@/app/services/equipment/getBoardEquipmentPending";
import { parseBoardUnitFilter } from "@/app/utils/board-unit-filter/parseBoardUnitFilter";
import EquipmentBoard from "./EquipmentBoard";
import type { EquipmentBoardEntryProps } from "./models/EquipmentBoardEntryProps.interface";

const EquipmentBoardEntry = async ({
  statusParam,
}: EquipmentBoardEntryProps = {}): Promise<React.JSX.Element> => {
  await ensureWorkModeChosen();
  const pendingDispatch = await getBoardPendingDispatch();

  return (
    <EquipmentBoard
      filter={parseBoardUnitFilter(statusParam)}
      pendingDispatch={pendingDispatch}
      equipmentPending={
        pendingDispatch.isVisible
          ? await getBoardEquipmentPending()
          : null
      }
    />
  );
};

export default EquipmentBoardEntry;

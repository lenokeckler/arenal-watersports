import { ensureWorkModeChosen } from "@/app/services/work-mode/ensureWorkModeChosen";
import { getBoardPendingDispatch } from "@/app/services/operations/getBoardPendingDispatch";
import EquipmentBoard from "./EquipmentBoard";

const EquipmentBoardEntry =
  async (): Promise<React.JSX.Element> => {
    await ensureWorkModeChosen();

    return (
      <EquipmentBoard
        pendingDispatch={await getBoardPendingDispatch()}
      />
    );
  };

export default EquipmentBoardEntry;

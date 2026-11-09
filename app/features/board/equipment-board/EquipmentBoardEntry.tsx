import { ensureWorkModeChosen } from "@/app/services/work-mode/ensureWorkModeChosen";
import EquipmentBoard from "./EquipmentBoard";

const EquipmentBoardEntry =
  async (): Promise<React.JSX.Element> => {
    await ensureWorkModeChosen();

    return <EquipmentBoard />;
  };

export default EquipmentBoardEntry;

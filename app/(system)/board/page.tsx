import type { Metadata } from "next";
import { ensureWorkModeChosen } from "@/app/features/access/work-mode/ensureWorkModeChosen";
import EquipmentBoard from "@/app/features/board/equipment-board/EquipmentBoard";
import { EQUIPMENT_BOARD_METADATA } from "@/app/features/board/equipment-board/constants/EquipmentBoardMetadata.constants";

export const metadata: Metadata = EQUIPMENT_BOARD_METADATA;

const EquipmentBoardPage =
  async (): Promise<React.JSX.Element> => {
    await ensureWorkModeChosen();

    return <EquipmentBoard />;
  };

export default EquipmentBoardPage;

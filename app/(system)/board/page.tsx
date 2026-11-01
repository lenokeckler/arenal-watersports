import type { Metadata } from "next";
import WorkModeGate from "@/app/features/access/work-mode/WorkModeGate";
import EquipmentBoard from "@/app/features/board/equipment-board/EquipmentBoard";
import { EQUIPMENT_BOARD_METADATA } from "@/app/features/board/equipment-board/constants/EquipmentBoardMetadata.constants";

export const metadata: Metadata = EQUIPMENT_BOARD_METADATA;

const EquipmentBoardPage = (): React.JSX.Element => (
  <>
    <WorkModeGate />
    <EquipmentBoard />
  </>
);

export default EquipmentBoardPage;

import type { Metadata } from "next";
import EquipmentBoardEntry from "@/app/features/board/equipment-board/EquipmentBoardEntry";
import { EQUIPMENT_BOARD_METADATA } from "@/app/features/board/equipment-board/constants/EquipmentBoardMetadata.constants";

export const metadata: Metadata = EQUIPMENT_BOARD_METADATA;

const HomePage = (): React.JSX.Element => (
  <EquipmentBoardEntry />
);

export default HomePage;

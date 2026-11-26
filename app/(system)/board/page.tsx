import type { Metadata } from "next";
import EquipmentBoardEntry from "@/app/features/board/equipment-board/EquipmentBoardEntry";
import { EQUIPMENT_BOARD_METADATA } from "@/app/features/board/equipment-board/constants/EquipmentBoardMetadata.constants";
import { BOARD_UNIT_FILTER_QUERY_PARAM } from "@/app/constants";

export const metadata: Metadata = EQUIPMENT_BOARD_METADATA;

const EquipmentBoardPage = async ({
  searchParams,
}: PageProps<"/board">): Promise<React.JSX.Element> => {
  const params = await searchParams;

  return (
    <EquipmentBoardEntry
      statusParam={params[BOARD_UNIT_FILTER_QUERY_PARAM]}
    />
  );
};

export default EquipmentBoardPage;

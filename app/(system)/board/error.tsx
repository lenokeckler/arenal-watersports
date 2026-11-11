"use client";

import EquipmentBoardError from "@/app/features/board/equipment-board/components/EquipmentBoardError";
import type { EquipmentBoardErrorProps } from "@/app/features/board/equipment-board/models/EquipmentBoardErrorProps.interface";

const EquipmentBoardRouteError = ({
  reset,
}: EquipmentBoardErrorProps): React.JSX.Element => (
  <EquipmentBoardError reset={reset} />
);

export default EquipmentBoardRouteError;

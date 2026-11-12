"use client";

import type { NullableRef } from "@/app/types";
import EquipmentBoardConnectionNotice from "./components/EquipmentBoardConnectionNotice";
import { useEquipmentBoardRealtimeViewModel } from "./hooks/useEquipmentBoardRealtimeViewModel";

const EquipmentBoardRealtime =
  (): NullableRef<React.JSX.Element> => {
    const { hasConnectionError } =
      useEquipmentBoardRealtimeViewModel();

    return hasConnectionError ? (
      <EquipmentBoardConnectionNotice />
    ) : null;
  };

export default EquipmentBoardRealtime;

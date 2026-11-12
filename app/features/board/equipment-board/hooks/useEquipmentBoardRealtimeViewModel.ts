import { useRouter } from "next/navigation";
import { useRealtimeRefresh } from "@/app/components/realtime/hooks/useRealtimeRefresh";
import { BOARD_REALTIME } from "@/app/constants";
import type { EquipmentBoardRealtimeViewModel } from "../models/EquipmentBoardRealtimeViewModel.interface";

export const useEquipmentBoardRealtimeViewModel =
  (): EquipmentBoardRealtimeViewModel => {
    const router = useRouter();
    const hasConnectionError = useRealtimeRefresh({
      channelName: BOARD_REALTIME.CHANNEL.EQUIPMENT_BOARD,
      onRefresh: router.refresh,
      tables: BOARD_REALTIME.TABLES,
    });
    return { hasConnectionError };
  };

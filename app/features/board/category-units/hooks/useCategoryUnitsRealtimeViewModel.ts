import { useRouter } from "next/navigation";
import { useRealtimeRefresh } from "@/app/components/realtime/hooks/useRealtimeRefresh";
import { BOARD_REALTIME } from "@/app/constants";
import type { CategoryUnitsRealtimeViewModel } from "../models/CategoryUnitsRealtimeViewModel.interface";

export const useCategoryUnitsRealtimeViewModel =
  (): CategoryUnitsRealtimeViewModel => {
    const router = useRouter();
    const hasConnectionError = useRealtimeRefresh({
      channelName: BOARD_REALTIME.CHANNEL.CATEGORY_UNITS,
      onRefresh: router.refresh,
      tables: BOARD_REALTIME.TABLES,
    });
    return { hasConnectionError };
  };

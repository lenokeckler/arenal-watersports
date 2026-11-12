import { useRouter } from "next/navigation";
import { useRealtimeRefresh } from "@/app/components/realtime/hooks/useRealtimeRefresh";
import { BOARD_REALTIME } from "@/app/constants";
import type { BoardRealtimeViewModel } from "../models/BoardRealtimeViewModel.interface";

export const useBoardRealtimeViewModel = (
  channelName: string
): BoardRealtimeViewModel => {
  const router = useRouter();
  const hasConnectionError = useRealtimeRefresh({
    channelName,
    onRefresh: router.refresh,
    tables: BOARD_REALTIME.TABLES,
  });
  return { hasConnectionError };
};

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { subscribeInventoryRefresh } from "../services/subscribeInventoryRefresh";

export const useInventoryRealtimeRefresh = (): void => {
  const router = useRouter();

  useEffect(
    () => subscribeInventoryRefresh(() => router.refresh()),
    [router]
  );
};

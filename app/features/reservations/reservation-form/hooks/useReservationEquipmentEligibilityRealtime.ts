import { useEffect } from "react";
import type { NullableRef } from "@/app/types";
import { createBrowserSupabaseClient } from "@/app/services/supabase/client";
import type { ReservationEquipmentEligibilityRealtimeOptions } from "../models/ReservationEquipmentEligibilityRealtimeOptions.interface";
import { createReservationEquipmentEligibilityStatusHandler } from "../utils/createReservationEquipmentEligibilityStatusHandler";
import { subscribeToReservationEquipmentEligibility } from "../utils/subscribeToReservationEquipmentEligibility";

export const useReservationEquipmentEligibilityRealtime = ({
  onChange,
  onSubscribed,
  onUnavailable,
  subscriptionAttempt,
}: ReservationEquipmentEligibilityRealtimeOptions): void => {
  useEffect(() => {
    let isActive = true;
    const supabase = createBrowserSupabaseClient();
    let channel: NullableRef<
      ReturnType<typeof supabase.channel>
    > = null;
    const connect = async (): Promise<void> => {
      try {
        const handleStatus =
          createReservationEquipmentEligibilityStatusHandler(
            {
              isActive: () => isActive,
              onSubscribed,
              onUnavailable,
            }
          );
        channel =
          await subscribeToReservationEquipmentEligibility({
            isActive: () => isActive,
            onChange,
            onStatus: handleStatus,
            subscriptionAttempt,
            supabase,
          });
      } catch {
        if (isActive) {
          onUnavailable();
        }
      }
    };
    void connect();

    return () => {
      isActive = false;
      if (channel) {
        void supabase.removeChannel(channel);
      }
    };
  }, [
    onChange,
    onSubscribed,
    onUnavailable,
    subscriptionAttempt,
  ]);
};

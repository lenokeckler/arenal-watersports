import { REALTIME_SUBSCRIBE_STATES } from "@supabase/supabase-js";
import type { ReservationEquipmentEligibilityStatusHandlers } from "../models/ReservationEquipmentEligibilityStatusHandlers.interface";

export const createReservationEquipmentEligibilityStatusHandler =

    ({
      isActive,
      onSubscribed,
      onUnavailable,
    }: ReservationEquipmentEligibilityStatusHandlers) =>
    (status: REALTIME_SUBSCRIBE_STATES): void => {
      if (!isActive()) {
        return;
      }
      if (status === REALTIME_SUBSCRIBE_STATES.SUBSCRIBED) {
        onSubscribed();
        return;
      }
      if (
        status ===
          REALTIME_SUBSCRIBE_STATES.CHANNEL_ERROR ||
        status === REALTIME_SUBSCRIBE_STATES.CLOSED ||
        status === REALTIME_SUBSCRIBE_STATES.TIMED_OUT
      ) {
        onUnavailable();
      }
    };

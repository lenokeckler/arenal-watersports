import { RESERVATION_EQUIPMENT_REALTIME } from "../constants/ReservationEquipmentRealtime.constants";
import type { ReservationEquipmentEligibilitySubscription } from "../models/ReservationEquipmentEligibilitySubscription.interface";

export const subscribeToReservationEquipmentEligibility =
  async ({
    isActive,
    onChange,
    onStatus,
    subscriptionAttempt,
    supabase,
  }: ReservationEquipmentEligibilitySubscription) => {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    if (error || !session) {
      throw error ?? new Error();
    }
    if (!isActive()) {
      return null;
    }
    await supabase.realtime.setAuth(session.access_token);
    if (!isActive()) {
      return null;
    }

    const channel = supabase.channel(
      `${RESERVATION_EQUIPMENT_REALTIME.CHANNEL_NAME_PREFIX}${subscriptionAttempt}`
    );
    Object.values(
      RESERVATION_EQUIPMENT_REALTIME.TABLE
    ).forEach((table) => {
      channel.on(
        RESERVATION_EQUIPMENT_REALTIME.DATABASE_EVENT,
        {
          event: RESERVATION_EQUIPMENT_REALTIME.EVENT,
          schema: RESERVATION_EQUIPMENT_REALTIME.SCHEMA,
          table,
        },
        onChange
      );
    });
    channel.subscribe(onStatus);

    return channel;
  };

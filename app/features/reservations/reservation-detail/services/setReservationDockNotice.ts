import { UUID_PATTERN } from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import {
  RESERVATION_DOCK_NOTICE_ERROR,
  RESERVATION_DOCK_NOTICE_RPC,
} from "../constants/ReservationDockNotice.constants";
import type { ReservationDockNoticeInput } from "../models/ReservationDockNoticeInput.interface";

export const setReservationDockNotice = async ({
  isNotified,
  reservationId,
}: ReservationDockNoticeInput): Promise<void> => {
  if (!UUID_PATTERN.test(reservationId)) {
    throw new RangeError(
      RESERVATION_DOCK_NOTICE_ERROR.INVALID_INPUT
    );
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.rpc(
    RESERVATION_DOCK_NOTICE_RPC,
    {
      p_notified: isNotified,
      p_reservation_id: reservationId,
    }
  );

  throwIfSupabaseError(
    error,
    RESERVATION_DOCK_NOTICE_ERROR.SET_NOTICE
  );
};

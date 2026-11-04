import { createServerSupabaseClient } from "@/app/services/supabase";
import { assertReservationCalendarAccess } from "@/app/services/reservations/assertReservationCalendarAccess";

export const getAuthorizedReservationDetailClient =
  async () => {
    const supabase = await createServerSupabaseClient();
    await assertReservationCalendarAccess(
      undefined,
      supabase
    );
    return supabase;
  };

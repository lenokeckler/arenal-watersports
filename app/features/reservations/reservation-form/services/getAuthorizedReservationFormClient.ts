import { redirect } from "next/navigation";
import { PATHS } from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { RESERVATION_FORM_ACCESS } from "../constants/ReservationFormUi.constants";

const RESERVATION_ACCESS_OPERATION =
  "check reservation form access";

export const getAuthorizedReservationFormClient =
  async () => {
    const supabase = await createServerSupabaseClient();
    const { data: userData, error: userError } =
      await supabase.auth.getUser();

    if (userError) {
      throw new Error(RESERVATION_ACCESS_OPERATION, {
        cause: userError,
      });
    }
    if (!userData.user) {
      redirect(PATHS.ACCESS.LOGIN);
    }

    const [areaResult, adminResult] = await Promise.all([
      supabase.rpc(RESERVATION_FORM_ACCESS.AREA_RPC, {
        target: RESERVATION_FORM_ACCESS.AREA,
      }),
      supabase.rpc(RESERVATION_FORM_ACCESS.ADMIN_RPC),
    ]);
    throwIfSupabaseError(
      areaResult.error,
      RESERVATION_ACCESS_OPERATION
    );
    throwIfSupabaseError(
      adminResult.error,
      RESERVATION_ACCESS_OPERATION
    );

    if (!areaResult.data && !adminResult.data) {
      redirect(PATHS.HOME);
    }

    return supabase;
  };

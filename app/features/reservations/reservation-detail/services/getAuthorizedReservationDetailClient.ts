import { redirect } from "next/navigation";
import { PATHS } from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import {
  RESERVATION_DETAIL_ACCESS,
  RESERVATION_DETAIL_OPERATION,
} from "../constants/ReservationDetail.constants";

export const getAuthorizedReservationDetailClient =
  async () => {
    const supabase = await createServerSupabaseClient();
    const { data: userData, error: userError } =
      await supabase.auth.getUser();

    if (userError) {
      throw new Error(RESERVATION_DETAIL_OPERATION.ACCESS, {
        cause: userError,
      });
    }
    if (!userData.user) {
      redirect(PATHS.ACCESS.LOGIN);
    }

    const [areaResult, administratorResult] =
      await Promise.all([
        supabase.rpc(RESERVATION_DETAIL_ACCESS.AREA_RPC, {
          target: RESERVATION_DETAIL_ACCESS.AREA,
        }),
        supabase.rpc(RESERVATION_DETAIL_ACCESS.ADMIN_RPC),
      ]);

    throwIfSupabaseError(
      areaResult.error,
      RESERVATION_DETAIL_OPERATION.ACCESS
    );
    throwIfSupabaseError(
      administratorResult.error,
      RESERVATION_DETAIL_OPERATION.ACCESS
    );

    if (!areaResult.data && !administratorResult.data) {
      redirect(PATHS.HOME);
    }

    return supabase;
  };

import { SUPABASE_WORK_AREA } from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { hasSignedInArea } from "./hasSignedInArea";

export const isIncomeReaderSignedIn =
  async (): Promise<boolean> => {
    const supabase = await createServerSupabaseClient();
    return (
      (await hasSignedInArea(
        supabase,
        SUPABASE_WORK_AREA.RESERVATIONS
      )) ||
      hasSignedInArea(
        supabase,
        SUPABASE_WORK_AREA.ADMINISTRATION
      )
    );
  };

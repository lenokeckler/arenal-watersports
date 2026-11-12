import { SUPABASE_WORK_AREA } from "@/app/constants";
import { hasSignedInArea } from "@/app/services/income/hasSignedInArea";
import { createServerSupabaseClient } from "@/app/services/supabase";

export const hasOperationsArea =
  async (): Promise<boolean> => {
    const supabase = await createServerSupabaseClient();

    return hasSignedInArea(
      supabase,
      SUPABASE_WORK_AREA.OPERATIONS
    );
  };

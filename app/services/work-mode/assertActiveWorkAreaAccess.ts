import { redirect } from "next/navigation";
import { PATHS, SUPABASE_RPC } from "@/app/constants";
import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import { isSignedInAdministrator } from "@/app/services/worker-registration/isSignedInAdministrator";
import type { WorkArea } from "@/app/types";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";

export const assertActiveWorkAreaAccess = async (
  supabase: ServerSupabaseClient,
  allowedAreas: readonly WorkArea[]
): Promise<void> => {
  const { data: currentArea, error: currentAreaError } =
    await supabase.rpc(SUPABASE_RPC.CURRENT_WORK_AREA);

  throwIfSupabaseError(
    currentAreaError,
    SUPABASE_RPC.CURRENT_WORK_AREA
  );

  if (!currentArea) {
    if (await isSignedInAdministrator(supabase)) {
      return;
    }

    redirect(PATHS.MODE);
  }

  if (!allowedAreas.includes(currentArea)) {
    redirect(PATHS.MODE);
  }

  const { data: hasActiveArea, error: activeAreaError } =
    await supabase.rpc(SUPABASE_RPC.HAS_AREA, {
      target: currentArea,
    });

  throwIfSupabaseError(
    activeAreaError,
    SUPABASE_RPC.HAS_AREA
  );

  if (!hasActiveArea) {
    redirect(PATHS.MODE);
  }
};

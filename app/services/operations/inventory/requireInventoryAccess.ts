import { redirect } from "next/navigation";
import { isAuthSessionMissingError } from "@supabase/supabase-js";
import {
  PATHS,
  WORK_MODE_ROUTE_ACCESS,
} from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { assertActiveWorkAreaAccess } from "@/app/services/work-mode/assertActiveWorkAreaAccess";
import type { InventorySupabaseClient } from "./models/InventoryReadModels.interface";

export const requireInventoryAccess =
  async (): Promise<InventorySupabaseClient> => {
    const supabase = await createServerSupabaseClient();
    const { data, error: authenticationError } =
      await supabase.auth.getUser();

    if (authenticationError) {
      if (!isAuthSessionMissingError(authenticationError)) {
        throw authenticationError;
      }

      redirect(PATHS.ACCESS.LOGIN);
    }

    if (!data.user) {
      redirect(PATHS.ACCESS.LOGIN);
    }

    await assertActiveWorkAreaAccess(
      supabase,
      WORK_MODE_ROUTE_ACCESS.OPERATIONS
    );

    return supabase;
  };

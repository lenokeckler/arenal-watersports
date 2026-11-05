import { redirect } from "next/navigation";
import { isAuthSessionMissingError } from "@supabase/supabase-js";
import {
  INVENTORY_ACCESS_FUNCTION,
  PATHS,
  WORK_AREA,
} from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { INVENTORY_QUERY } from "./constants/InventoryQuery.constants";
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

    const {
      data: hasOperationsArea,
      error: operationsAreaError,
    } = await supabase.rpc(
      INVENTORY_ACCESS_FUNCTION.HAS_AREA,
      {
        target: WORK_AREA.OPERATIONS,
      }
    );

    throwIfSupabaseError(
      operationsAreaError,
      INVENTORY_QUERY.OPERATIONS_ACCESS
    );

    if (hasOperationsArea) {
      return supabase;
    }

    const {
      data: isAdministrator,
      error: administratorError,
    } = await supabase.rpc(
      INVENTORY_ACCESS_FUNCTION.IS_ADMIN
    );

    throwIfSupabaseError(
      administratorError,
      INVENTORY_QUERY.ADMINISTRATOR_ACCESS
    );

    if (!isAdministrator) {
      redirect(PATHS.HOME);
    }

    return supabase;
  };

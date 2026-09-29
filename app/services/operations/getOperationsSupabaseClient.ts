import { createServerSupabaseClient } from "@/app/services/supabase";
import {
  OPERATIONS_ACCESS_ERROR,
  OPERATIONS_AREA,
} from "@/app/components/dispatch-board/constants/DispatchBoard.constants";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import type { PendingDispatchDatabase } from "./models/PendingDispatchDatabase.type";
import type { PendingDispatchSupabaseClient } from "./models/PendingDispatchSupabaseClient.type";

export class OperationsAccessError extends Error {
  constructor() {
    super(OPERATIONS_ACCESS_ERROR);
    this.name = "OperationsAccessError";
  }
}

export const getOperationsSupabaseClient =
  async (): Promise<PendingDispatchSupabaseClient> => {
    const supabase =
      await createServerSupabaseClient<PendingDispatchDatabase>();
    const { data: userData, error: userError } =
      await supabase.auth.getUser();

    if (userError) {
      throw userError;
    }

    if (!userData.user) {
      throw new OperationsAccessError();
    }

    const { data: hasOperationsArea, error: accessError } =
      await supabase.rpc("has_area", {
        target: OPERATIONS_AREA,
      });
    throwIfSupabaseError(
      accessError,
      "check operations access"
    );

    if (!hasOperationsArea) {
      throw new OperationsAccessError();
    }

    return supabase;
  };

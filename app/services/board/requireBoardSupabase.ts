import { redirect } from "next/navigation";
import {
  PATHS,
  WORK_MODE_ROUTE_ACCESS,
} from "@/app/constants";
import { readSignedInUserId } from "@/app/services/authentication/readSignedInUserId";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { assertActiveWorkAreaAccess } from "@/app/services/work-mode/assertActiveWorkAreaAccess";
import type { BoardSupabaseClient } from "./models/BoardSupabaseClient.type";

export const requireBoardSupabase =
  async (): Promise<BoardSupabaseClient> => {
    const supabase = await createServerSupabaseClient();
    const userId = await readSignedInUserId(supabase);

    if (!userId) {
      redirect(PATHS.ACCESS.LOGIN);
    }

    await assertActiveWorkAreaAccess(
      supabase,
      WORK_MODE_ROUTE_ACCESS.BOARD
    );

    return supabase;
  };

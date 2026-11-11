import { redirect } from "next/navigation";
import { PATHS } from "@/app/constants";
import { readSignedInUserId } from "@/app/services/authentication/readSignedInUserId";
import { createServerSupabaseClient } from "@/app/services/supabase";
import type { BoardSupabaseClient } from "./models/BoardSupabaseClient.type";

export const requireBoardSupabase =
  async (): Promise<BoardSupabaseClient> => {
    const supabase = await createServerSupabaseClient();
    const userId = await readSignedInUserId(supabase);

    if (!userId) {
      redirect(PATHS.ACCESS.LOGIN);
    }

    return supabase;
  };

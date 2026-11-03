import { createServerSupabaseClient } from "@/app/services/supabase";
import type { NullableRef } from "@/app/types";
import type { WorkModeOverview } from "./models/WorkModeOverview.interface";
import { readWorkModeOverview } from "./readWorkModeOverview";

export const readWorkModeOverviewAsSignedIn =
  async (): Promise<NullableRef<WorkModeOverview>> =>
    readWorkModeOverview(
      await createServerSupabaseClient()
    );

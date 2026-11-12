import type { WorkModeResult } from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import type { WorkArea } from "@/app/types";
import { chooseWorkArea } from "./chooseWorkArea";

export const chooseWorkAreaAsSignedIn = async (
  area: WorkArea
): Promise<WorkModeResult> =>
  chooseWorkArea(await createServerSupabaseClient(), area);

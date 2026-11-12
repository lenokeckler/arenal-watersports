import { createServerSupabaseClient } from "@/app/services/supabase";
import type { TemporaryPasswordGrant } from "./models/TemporaryPasswordGrant.type";
import { rehireWorker } from "./rehireWorker";

export const rehireWorkerAsSignedIn = async (
  workerId: string
): Promise<TemporaryPasswordGrant> =>
  rehireWorker(
    await createServerSupabaseClient(),
    workerId
  );

import { createServerSupabaseClient } from "@/app/services/supabase";
import type { NullableRef } from "@/app/types";
import { readSignedInWorker } from "./readSignedInWorker";

export const readSignedInUsername = async (): Promise<
  NullableRef<string>
> => {
  const supabase = await createServerSupabaseClient();
  const worker = await readSignedInWorker(supabase);

  return worker?.username ?? null;
};

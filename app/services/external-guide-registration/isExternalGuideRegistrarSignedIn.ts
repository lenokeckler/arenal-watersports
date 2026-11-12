import { createServerSupabaseClient } from "@/app/services/supabase";
import { isExternalGuideRegistrar } from "./isExternalGuideRegistrar";

export const isExternalGuideRegistrarSignedIn =
  async (): Promise<boolean> =>
    isExternalGuideRegistrar(
      await createServerSupabaseClient()
    );

import { createServerSupabaseClient } from "@/app/services/supabase";
import { isSignedInAdministrator } from "./isSignedInAdministrator";

export const isAdministratorSignedIn =
  async (): Promise<boolean> =>
    isSignedInAdministrator(
      await createServerSupabaseClient()
    );

import { createServerSupabaseClient } from "@/app/services/supabase";
import { grantTemporaryPassword } from "./grantTemporaryPassword";
import type { TemporaryPasswordGrant } from "./models/TemporaryPasswordGrant.type";

export const grantTemporaryPasswordAsSignedIn = async (
  workerId: string
): Promise<TemporaryPasswordGrant> =>
  grantTemporaryPassword(
    await createServerSupabaseClient(),
    workerId
  );

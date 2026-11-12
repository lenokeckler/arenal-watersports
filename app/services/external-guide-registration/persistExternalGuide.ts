import { SUPABASE_RPC } from "@/app/constants";
import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import type { ExternalGuideRegistrationInput } from "./models/ExternalGuideRegistrationInput.interface";

export const persistExternalGuide = async (
  supabase: ServerSupabaseClient,
  guideId: string,
  input: ExternalGuideRegistrationInput
): Promise<string | null> => {
  const { data, error } = await supabase.rpc(
    SUPABASE_RPC.REGISTER_EXTERNAL_GUIDE,
    {
      guide_id: guideId,
      guide_full_name: input.fullName,
      guide_national_id: input.nationalId,
      guide_expires_on: input.expiresOn,
      guide_personal_email: input.personalEmail,
    }
  );

  throwIfSupabaseError(
    error,
    SUPABASE_RPC.REGISTER_EXTERNAL_GUIDE
  );

  return data;
};

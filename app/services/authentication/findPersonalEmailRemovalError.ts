import { PERSONAL_EMAIL_ERROR_CODE } from "@/app/constants";
import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import type { NullableRef } from "@/app/types";
import { createPersonalEmailError } from "@/app/utils/personal-email/createPersonalEmailError";
import type { PersonalEmailError } from "@/app/utils/personal-email/models/PersonalEmailError.interface";
import { readOwnPersonalEmail } from "./readOwnPersonalEmail";

export const findPersonalEmailRemovalError = async (
  supabase: ServerSupabaseClient
): Promise<NullableRef<PersonalEmailError>> => {
  const own = await readOwnPersonalEmail(supabase);

  if (!own) {
    return createPersonalEmailError(
      PERSONAL_EMAIL_ERROR_CODE.SESSION_INACTIVE
    );
  }

  return own.isRequired
    ? createPersonalEmailError(
        PERSONAL_EMAIL_ERROR_CODE.ADMINISTRATION_EMAIL_REQUIRED
      )
    : null;
};

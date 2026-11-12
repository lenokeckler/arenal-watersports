import { readSignedInUserId } from "@/app/services/authentication/readSignedInUserId";
import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import { checkExternalGuideRegistrationInput } from "./checkExternalGuideRegistrationInput";
import { EXTERNAL_GUIDE_REGISTRATION_ERROR_CODE } from "./constants/ExternalGuideRegistration.constants";
import { isExternalGuideRegistrar } from "./isExternalGuideRegistrar";
import type { ExternalGuideRegistrationInput } from "./models/ExternalGuideRegistrationInput.interface";
import type { ExternalGuideRegistrationResult } from "./models/ExternalGuideRegistrationResult.type";
import { provisionExternalGuide } from "./provisionExternalGuide";

export const registerExternalGuide = async (
  supabase: ServerSupabaseClient,
  input: ExternalGuideRegistrationInput
): Promise<ExternalGuideRegistrationResult> => {
  if (!checkExternalGuideRegistrationInput(input)) {
    return {
      ok: false,
      code: EXTERNAL_GUIDE_REGISTRATION_ERROR_CODE.INVALID_INPUT,
    };
  }

  const createdBy = await readSignedInUserId(supabase);

  if (
    !createdBy ||
    !(await isExternalGuideRegistrar(supabase))
  ) {
    return {
      ok: false,
      code: EXTERNAL_GUIDE_REGISTRATION_ERROR_CODE.NOT_ALLOWED,
    };
  }

  return provisionExternalGuide(supabase, input);
};

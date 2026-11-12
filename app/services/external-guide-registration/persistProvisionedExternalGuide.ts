import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import { deleteWorkerAuthUser } from "@/app/services/worker-registration/deleteWorkerAuthUser";
import {
  EXTERNAL_GUIDE_REGISTRATION_ERROR_CODE,
  EXTERNAL_GUIDE_REGISTRATION_RESULT,
} from "./constants/ExternalGuideRegistration.constants";
import { mapExternalGuideDatabaseFailure } from "./mapExternalGuideRegistrationFailure";
import type { ExternalGuideRegistrationInput } from "./models/ExternalGuideRegistrationInput.interface";
import type { ExternalGuideRegistrationResult } from "./models/ExternalGuideRegistrationResult.type";
import { persistExternalGuide } from "./persistExternalGuide";

export const persistProvisionedExternalGuide = async (
  supabase: ServerSupabaseClient,
  guideId: string,
  input: ExternalGuideRegistrationInput,
  temporaryPassword: string
): Promise<ExternalGuideRegistrationResult> => {
  let registrationResult;

  try {
    registrationResult = await persistExternalGuide(
      supabase,
      guideId,
      input
    );
  } catch {
    await deleteWorkerAuthUser(guideId);
    return {
      ok: false,
      code: EXTERNAL_GUIDE_REGISTRATION_ERROR_CODE.FAILED,
    };
  }

  if (
    registrationResult !==
    EXTERNAL_GUIDE_REGISTRATION_RESULT.CREATED
  ) {
    await deleteWorkerAuthUser(guideId);
    return {
      ok: false,
      code: mapExternalGuideDatabaseFailure(
        registrationResult
      ),
    };
  }

  return {
    ok: true,
    registered: { ...input, temporaryPassword },
  };
};

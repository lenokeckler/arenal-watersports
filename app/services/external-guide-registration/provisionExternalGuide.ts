import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import { createWorkerAuthUser } from "@/app/services/worker-registration/createWorkerAuthUser";
import { generateTemporaryPassword } from "@/app/services/worker-registration/generateTemporaryPassword";
import { normalizeWorkerFullName } from "@/app/utils/worker-registration/normalizeWorkerFullName";
import { normalizeUsername } from "@/app/utils/username/normalizeUsername";
import { mapExternalGuideAuthFailure } from "./mapExternalGuideRegistrationFailure";
import type { ExternalGuideRegistrationInput } from "./models/ExternalGuideRegistrationInput.interface";
import type { ExternalGuideRegistrationResult } from "./models/ExternalGuideRegistrationResult.type";
import { persistProvisionedExternalGuide } from "./persistProvisionedExternalGuide";

export const provisionExternalGuide = async (
  supabase: ServerSupabaseClient,
  input: ExternalGuideRegistrationInput
): Promise<ExternalGuideRegistrationResult> => {
  const normalized = {
    fullName: normalizeWorkerFullName(input.fullName),
    nationalId: normalizeUsername(input.nationalId),
    expiresOn: input.expiresOn,
    personalEmail: input.personalEmail?.trim() || undefined,
  };
  const temporaryPassword = generateTemporaryPassword();
  const authUser = await createWorkerAuthUser(
    normalized.nationalId,
    temporaryPassword
  );

  if (!authUser.ok) {
    return {
      ok: false,
      code: mapExternalGuideAuthFailure(authUser.code),
    };
  }

  return persistProvisionedExternalGuide(
    supabase,
    authUser.userId,
    normalized,
    temporaryPassword
  );
};

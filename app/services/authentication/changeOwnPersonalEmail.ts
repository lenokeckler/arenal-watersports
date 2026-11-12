import { createServerSupabaseClient } from "@/app/services/supabase";
import { mapReauthenticationError } from "@/app/utils/personal-email/mapReauthenticationError";
import type { PersonalEmailChangeInput } from "@/app/utils/personal-email/models/PersonalEmailChangeInput.interface";
import { resolveWrittenAddress } from "@/app/utils/personal-email/resolveWrittenAddress";
import { validatePersonalEmailChange } from "@/app/utils/personal-email/validatePersonalEmailChange";
import { findPersonalEmailRemovalError } from "./findPersonalEmailRemovalError";
import type { PersonalEmailChangeResult } from "./models/PersonalEmailChangeResult.type";
import { reauthenticateSettledWorker } from "./reauthenticateSettledWorker";
import { updateOwnPersonalEmail } from "./updateOwnPersonalEmail";

export const changeOwnPersonalEmail = async (
  input: PersonalEmailChangeInput
): Promise<PersonalEmailChangeResult> => {
  const validation = validatePersonalEmailChange(input);

  if (!validation.ok) {
    return validation;
  }

  const { change } = validation;
  const supabase = await createServerSupabaseClient();
  const reauthentication =
    await reauthenticateSettledWorker(
      supabase,
      change.currentPassword
    );

  if (!reauthentication.ok) {
    return {
      ok: false,
      error: mapReauthenticationError(
        reauthentication.error
      ),
    };
  }

  const removalError = findPersonalEmailRemovalError(
    change,
    reauthentication.worker.baseRole
  );

  if (removalError) {
    return { ok: false, error: removalError };
  }

  await updateOwnPersonalEmail(
    supabase,
    resolveWrittenAddress(change)
  );

  return { ok: true, intent: change.intent };
};

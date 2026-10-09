import { PERSONAL_EMAIL_INTENT } from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { createPersonalEmailError } from "@/app/utils/personal-email/createPersonalEmailError";
import type { PersonalEmailChangeInput } from "@/app/utils/personal-email/models/PersonalEmailChangeInput.interface";
import { resolvePersonalEmailErrorCode } from "@/app/utils/personal-email/resolvePersonalEmailErrorCode";
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
      error: createPersonalEmailError(
        resolvePersonalEmailErrorCode(
          reauthentication.error.code
        )
      ),
    };
  }

  if (change.intent === PERSONAL_EMAIL_INTENT.REMOVE) {
    const removalError =
      await findPersonalEmailRemovalError(supabase);

    if (removalError) {
      return { ok: false, error: removalError };
    }
  }

  await updateOwnPersonalEmail(
    supabase,
    reauthentication.worker.id,
    change.intent === PERSONAL_EMAIL_INTENT.SAVE
      ? change.address
      : null
  );

  return { ok: true, intent: change.intent };
};

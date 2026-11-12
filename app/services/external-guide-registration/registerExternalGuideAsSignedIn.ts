import { createServerSupabaseClient } from "@/app/services/supabase";
import type { ExternalGuideRegistrationInput } from "./models/ExternalGuideRegistrationInput.interface";
import type { ExternalGuideRegistrationResult } from "./models/ExternalGuideRegistrationResult.type";
import { registerExternalGuide } from "./registerExternalGuide";

export const registerExternalGuideAsSignedIn = async (
  input: ExternalGuideRegistrationInput
): Promise<ExternalGuideRegistrationResult> =>
  registerExternalGuide(
    await createServerSupabaseClient(),
    input
  );

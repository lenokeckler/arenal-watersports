import { PERSONAL_EMAIL_ERROR_CODE } from "@/app/constants";
import type { PersonalEmailChangeResult } from "@/app/services/authentication";
import { createPersonalEmailError } from "@/app/utils/personal-email/createPersonalEmailError";
import type { PersonalEmailChangeInput } from "@/app/utils/personal-email/models/PersonalEmailChangeInput.interface";
import { runWithFallback } from "@/app/utils/server-action/runWithFallback";
import type { PersonalEmailOperation } from "../models/PersonalEmailOperation.type";

export const runPersonalEmailChange = (
  change: PersonalEmailOperation,
  input: PersonalEmailChangeInput
): Promise<PersonalEmailChangeResult> =>
  runWithFallback(
    change,
    input,
    (): PersonalEmailChangeResult => ({
      ok: false,
      error: createPersonalEmailError(
        PERSONAL_EMAIL_ERROR_CODE.UNKNOWN
      ),
    })
  );

import {
  PERSONAL_EMAIL_ERROR_CODE,
  PERSONAL_EMAIL_INTENT,
  SUPABASE_WORK_AREA,
} from "@/app/constants";
import type { NullableRef, WorkArea } from "@/app/types";
import { createPersonalEmailError } from "@/app/utils/personal-email/createPersonalEmailError";
import type { PersonalEmailChange } from "@/app/utils/personal-email/models/PersonalEmailChange.type";
import type { PersonalEmailError } from "@/app/utils/personal-email/models/PersonalEmailError.interface";

export const findPersonalEmailRemovalError = (
  change: PersonalEmailChange,
  baseRole: WorkArea
): NullableRef<PersonalEmailError> =>
  change.intent === PERSONAL_EMAIL_INTENT.REMOVE &&
  baseRole === SUPABASE_WORK_AREA.ADMINISTRATION
    ? createPersonalEmailError(
        PERSONAL_EMAIL_ERROR_CODE.ADMINISTRATION_EMAIL_REQUIRED
      )
    : null;

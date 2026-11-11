import {
  PERSONAL_EMAIL_FIELD,
  PERSONAL_EMAIL_INTENT_FIELD,
} from "@/app/constants";
import { readTextField } from "@/app/utils/form-data/readTextField";
import type { PersonalEmailChangeInput } from "@/app/utils/personal-email/models/PersonalEmailChangeInput.interface";

export const readPersonalEmailInput = (
  formData: FormData
): PersonalEmailChangeInput => ({
  currentPassword: readTextField(
    formData,
    PERSONAL_EMAIL_FIELD.CURRENT_PASSWORD
  ),
  email: readTextField(
    formData,
    PERSONAL_EMAIL_FIELD.EMAIL
  ),
  intent: readTextField(
    formData,
    PERSONAL_EMAIL_INTENT_FIELD
  ),
});

import {
  PERSONAL_EMAIL_FIELD,
  PERSONAL_EMAIL_INTENT_FIELD,
  STRING,
} from "@/app/constants";
import type { PersonalEmailChangeInput } from "@/app/utils/personal-email/models/PersonalEmailChangeInput.interface";

const readTextField = (
  formData: FormData,
  field: string
): string => {
  const value = formData.get(field);
  return typeof value === "string" ? value : STRING.Empty;
};

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

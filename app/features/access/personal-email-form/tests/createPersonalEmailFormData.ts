import {
  PERSONAL_EMAIL_FIELD,
  PERSONAL_EMAIL_INTENT_FIELD,
} from "@/app/constants";
import type { PersonalEmailChangeInput } from "@/app/utils/personal-email/models/PersonalEmailChangeInput.interface";

export const createPersonalEmailFormData = ({
  currentPassword,
  email,
  intent,
}: PersonalEmailChangeInput): FormData => {
  const formData = new FormData();
  formData.set(
    PERSONAL_EMAIL_FIELD.CURRENT_PASSWORD,
    currentPassword
  );
  formData.set(PERSONAL_EMAIL_FIELD.EMAIL, email);
  formData.set(PERSONAL_EMAIL_INTENT_FIELD, intent);
  return formData;
};

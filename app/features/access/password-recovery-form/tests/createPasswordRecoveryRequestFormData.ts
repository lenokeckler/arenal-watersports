import { PASSWORD_RECOVERY_FIELD } from "@/app/constants";

export const createPasswordRecoveryRequestFormData = (
  username: string
): FormData => {
  const formData = new FormData();
  formData.set(PASSWORD_RECOVERY_FIELD.USERNAME, username);
  return formData;
};

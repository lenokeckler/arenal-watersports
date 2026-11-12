import { SIGN_IN_FIELD } from "@/app/constants";
import type { SignInCredentials } from "@/app/utils/sign-in/models/SignInCredentials.interface";

export const createSignInFormData = ({
  password,
  username,
}: SignInCredentials): FormData => {
  const formData = new FormData();
  formData.set(SIGN_IN_FIELD.USERNAME, username);
  formData.set(SIGN_IN_FIELD.PASSWORD, password);
  return formData;
};

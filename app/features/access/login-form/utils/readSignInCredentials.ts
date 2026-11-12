import { SIGN_IN_FIELD } from "@/app/constants/access/SignInError.constants";
import { readTextField } from "@/app/utils/form-data/readTextField";
import type { SignInCredentials } from "@/app/utils/sign-in/models/SignInCredentials.interface";

export const readSignInCredentials = (
  formData: FormData
): SignInCredentials => ({
  password: readTextField(formData, SIGN_IN_FIELD.PASSWORD),
  username: readTextField(formData, SIGN_IN_FIELD.USERNAME),
});

import { STRING } from "@/app/constants";
import {
  SIGN_IN_FIELD,
  type SignInField,
} from "@/app/constants/access/SignInError.constants";
import type { SignInCredentials } from "@/app/utils/sign-in/models/SignInCredentials.interface";

const readTextField = (
  formData: FormData,
  field: SignInField
): string => {
  const value = formData.get(field);
  return typeof value === "string" ? value : STRING.Empty;
};

export const readSignInCredentials = (
  formData: FormData
): SignInCredentials => ({
  password: readTextField(formData, SIGN_IN_FIELD.PASSWORD),
  username: readTextField(formData, SIGN_IN_FIELD.USERNAME),
});

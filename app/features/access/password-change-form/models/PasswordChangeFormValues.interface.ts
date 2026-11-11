import type { PasswordChangeInput } from "@/app/utils/password-change/models/PasswordChangeInput.interface";
import type { PasswordChangeFieldChangeHandler } from "./PasswordChangeFieldChangeHandler.type";

export interface PasswordChangeFormValues {
  onChange: PasswordChangeFieldChangeHandler;
  values: PasswordChangeInput;
}

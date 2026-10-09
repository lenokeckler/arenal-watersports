import type {
  PASSWORD_CHANGE_FIELD,
  PasswordChangeField,
} from "@/app/constants/access/PasswordChangeError.constants";

export type PasswordChangeFocusField = Exclude<
  PasswordChangeField,
  typeof PASSWORD_CHANGE_FIELD.FORM
>;

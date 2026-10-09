import type { PasswordChangeFormViewModel } from "./PasswordChangeFormViewModel.interface";

export type PasswordChangeFormFieldsProps = Pick<
  PasswordChangeFormViewModel,
  | "fieldErrors"
  | "fieldRefs"
  | "isPending"
  | "onChange"
  | "passwordRules"
  | "showFailures"
  | "values"
>;

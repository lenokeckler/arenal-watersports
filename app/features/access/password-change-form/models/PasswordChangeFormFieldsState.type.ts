import type { PasswordChangeFormViewModel } from "./PasswordChangeFormViewModel.interface";

export type PasswordChangeFormFieldsState = Pick<
  PasswordChangeFormViewModel,
  | "fieldErrors"
  | "fieldRefs"
  | "isPending"
  | "onChange"
  | "passwordRules"
  | "showFailures"
  | "values"
>;

import type { FirstSignInFormViewModel } from "./FirstSignInFormViewModel.interface";

export type FirstSignInFormFieldsProps = Pick<
  FirstSignInFormViewModel,
  | "fieldErrors"
  | "fieldRefs"
  | "isPending"
  | "onChange"
  | "passwordRules"
  | "showFailures"
  | "values"
>;

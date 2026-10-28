import type { PasswordRecoveryNewPasswordViewModel } from "./PasswordRecoveryNewPasswordViewModel.interface";

export type PasswordRecoveryNewPasswordFieldsProps = Omit<
  PasswordRecoveryNewPasswordViewModel,
  "formAction" | "onSubmit"
>;

import type { PasswordFieldProps } from "@/app/components/password-field/models/PasswordFieldProps.interface";

export type PasswordChangeSharedFieldProps = Pick<
  PasswordFieldProps,
  | "error"
  | "inputRef"
  | "isPending"
  | "onChange"
  | "placeholder"
  | "value"
>;

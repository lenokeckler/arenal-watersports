import type { PasswordChangeFormFieldProps } from "./PasswordChangeFormFieldProps.interface";

export type PasswordChangeSharedFieldProps = Pick<
  PasswordChangeFormFieldProps,
  "error" | "inputRef" | "isPending" | "onChange" | "value"
>;

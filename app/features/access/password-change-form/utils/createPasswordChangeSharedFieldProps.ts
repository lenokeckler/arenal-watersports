import type { PasswordChangeFocusField } from "../models/PasswordChangeFocusField.type";
import type { PasswordChangeFormFieldsProps } from "../models/PasswordChangeFormFieldsProps.interface";
import type { PasswordChangeSharedFieldProps } from "../models/PasswordChangeSharedFieldProps.type";

export const createPasswordChangeSharedFieldProps = (
  {
    fieldErrors,
    fieldRefs,
    isPending,
    onChange,
    values,
  }: PasswordChangeFormFieldsProps,
  field: PasswordChangeFocusField
): PasswordChangeSharedFieldProps => ({
  error: fieldErrors[field],
  inputRef: fieldRefs[field],
  isPending,
  onChange,
  value: values[field],
});

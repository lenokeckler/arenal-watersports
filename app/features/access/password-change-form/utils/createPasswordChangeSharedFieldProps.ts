import type { PasswordChangeFocusField } from "../models/PasswordChangeFocusField.type";
import type { PasswordChangeFormFieldsState } from "../models/PasswordChangeFormFieldsState.type";
import type { PasswordChangeSharedFieldProps } from "../models/PasswordChangeSharedFieldProps.type";

export const createPasswordChangeSharedFieldProps = (
  {
    fieldErrors,
    fieldRefs,
    isPending,
    onChange,
    values,
  }: PasswordChangeFormFieldsState,
  field: PasswordChangeFocusField
): PasswordChangeSharedFieldProps => ({
  error: fieldErrors[field],
  inputRef: fieldRefs[field],
  isPending,
  onChange,
  value: values[field],
});

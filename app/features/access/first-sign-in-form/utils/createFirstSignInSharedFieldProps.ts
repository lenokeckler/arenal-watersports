import type { FirstSignInFocusField } from "../models/FirstSignInFocusField.type";
import type { FirstSignInFormFieldsProps } from "../models/FirstSignInFormFieldsProps.interface";
import type { FirstSignInSharedFieldProps } from "../models/FirstSignInSharedFieldProps.type";

export const createFirstSignInSharedFieldProps = (
  {
    fieldErrors,
    fieldRefs,
    isPending,
    onChange,
    values,
  }: FirstSignInFormFieldsProps,
  field: FirstSignInFocusField
): FirstSignInSharedFieldProps => ({
  error: fieldErrors[field],
  inputRef: fieldRefs[field],
  isPending,
  onChange,
  value: values[field],
});

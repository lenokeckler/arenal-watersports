import type { PasswordChangeFormCopy } from "./PasswordChangeFormCopy.interface";
import type { PasswordChangeFormFieldsState } from "./PasswordChangeFormFieldsState.type";

export interface PasswordChangeFormFieldsProps extends PasswordChangeFormFieldsState {
  copy: PasswordChangeFormCopy;
}

import type { RefObject } from "react";
import type { Autocomplete } from "@/app/components/form-field/constants/InputTypes.constants";
import type { NullableRef } from "@/app/types";
import type { PasswordChangeFieldChangeHandler } from "./PasswordChangeFieldChangeHandler.type";
import type { PasswordChangeFocusField } from "./PasswordChangeFocusField.type";

export interface PasswordChangeFormFieldProps {
  autoComplete: Autocomplete;
  describedBy?: string;
  error: NullableRef<string>;
  field: PasswordChangeFocusField;
  inputRef: RefObject<NullableRef<HTMLInputElement>>;
  isPending: boolean;
  label: string;
  onChange: PasswordChangeFieldChangeHandler;
  value: string;
}

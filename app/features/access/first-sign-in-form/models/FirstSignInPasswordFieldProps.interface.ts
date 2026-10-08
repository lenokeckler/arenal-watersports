import type { RefObject } from "react";
import type { Autocomplete } from "@/app/components/form-field/constants/InputTypes.constants";
import type { NullableRef } from "@/app/types";
import type { FirstSignInChangeHandler } from "./FirstSignInChangeHandler.type";
import type { FirstSignInFocusField } from "./FirstSignInFocusField.type";

export interface FirstSignInPasswordFieldProps {
  autoComplete: Autocomplete;
  describedBy?: string;
  error: NullableRef<string>;
  field: FirstSignInFocusField;
  inputRef: RefObject<NullableRef<HTMLInputElement>>;
  isPending: boolean;
  label: string;
  onChange: FirstSignInChangeHandler;
  value: string;
}

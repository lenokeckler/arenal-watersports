import type { RefObject } from "react";
import type { Autocomplete } from "../../form-field/constants/InputTypes.constants";
import type { FormFieldProps } from "../../form-field/models/FormFieldProps.interface";
import type { NullableRef } from "@/app/types";

export interface PasswordFieldProps {
  autoComplete: Autocomplete;
  describedBy?: string;
  error: NullableRef<string>;
  inputRef: RefObject<NullableRef<HTMLInputElement>>;
  isPending: boolean;
  label: string;
  name: string;
  onChange: FormFieldProps["onChange"];
  placeholder: string;
  value: string;
}

import type { RefObject } from "react";
import type { FormFieldProps } from "@/app/components/form-field/models/FormFieldProps.interface";
import type { NullableRef } from "@/app/types";

export interface PersonalEmailFieldProps {
  error: NullableRef<string>;
  inputRef: RefObject<NullableRef<HTMLInputElement>>;
  isPending: boolean;
  onChange: FormFieldProps["onChange"];
  value: string;
}

import type { FormFieldVariant } from "./FormFieldVariant.type";

export interface FormFieldInputClassNameOptions {
  classNameField: string;
  hasError: boolean;
  isPlaceholderValue: boolean;
  isInteractive: boolean;
  readOnly: boolean;
  disabled: boolean;
  variant: FormFieldVariant;
}

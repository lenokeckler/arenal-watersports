import { FormFieldProps } from "./FormFieldProps.interface";

export interface FormFieldModalProps
  extends
    FormFieldProps,
    Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      keyof FormFieldProps
    > {}

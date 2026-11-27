import type { FormFieldProps } from "@/app/components/form-field/models/FormFieldProps.interface";

export interface LinkSelectViewModel {
  handleChange: FormFieldProps["onChange"];
  selectOptions: NonNullable<FormFieldProps["options"]>;
}

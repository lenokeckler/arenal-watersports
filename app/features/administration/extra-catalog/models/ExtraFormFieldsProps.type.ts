import type { ExtraFormViewModel } from "./ExtraFormViewModel.interface";

export type ExtraFormFieldsProps = Pick<
  ExtraFormViewModel,
  "values" | "errors" | "isSubmitting" | "onNameChange"
>;

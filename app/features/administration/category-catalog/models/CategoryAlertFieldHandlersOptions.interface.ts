import type { Dispatch, SetStateAction } from "react";
import type { CategoryAlertFormErrors } from "./CategoryAlertFormErrors.interface";
import type { CategoryAlertFormValues } from "./CategoryAlertFormValues.interface";

export interface CategoryAlertFieldHandlersOptions {
  setValues: Dispatch<
    SetStateAction<CategoryAlertFormValues>
  >;
  clearErrors: (
    fields: Array<keyof CategoryAlertFormErrors>
  ) => void;
}

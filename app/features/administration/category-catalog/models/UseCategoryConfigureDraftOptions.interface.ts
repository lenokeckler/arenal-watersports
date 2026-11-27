import type { NullableRef } from "@/app/types";
import type { CategoryEditedValues } from "./CategoryEditedValues.interface";

export interface UseCategoryConfigureDraftOptions {
  isInitiallyActive: boolean;
  values: CategoryEditedValues;
  pickedFile: NullableRef<File>;
}

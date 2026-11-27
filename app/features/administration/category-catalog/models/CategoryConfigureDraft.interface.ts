import type { NullableRef } from "@/app/types";
import type { CategoryEditedValues } from "./CategoryEditedValues.interface";

export interface CategoryConfigureDraft {
  values: CategoryEditedValues;
  pickedFile: NullableRef<File>;
  isActive: boolean;
}

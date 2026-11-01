import type { CategoryBehaviorFormValues } from "../../models/CategoryBehaviorFormValues.interface";

export type FormValuesAction = (
  values: CategoryBehaviorFormValues
) => CategoryBehaviorFormValues;

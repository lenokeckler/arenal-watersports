import type { CategoryBehaviorFieldHandlersOptions } from "./CategoryBehaviorFieldHandlersOptions.interface";

export type CategoryBehaviorDependentHandlersOptions = Pick<
  CategoryBehaviorFieldHandlersOptions,
  "trackingMode" | "setValues"
>;

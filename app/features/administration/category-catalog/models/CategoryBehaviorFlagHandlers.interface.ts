import type { CategoryBehaviorFieldHandlers } from "./CategoryBehaviorFieldHandlers.interface";

export type CategoryBehaviorFlagHandlers = Pick<
  CategoryBehaviorFieldHandlers,
  | "onCanBeDamagedChange"
  | "onConsumesFuelChange"
  | "onGuideOnlyChange"
  | "onUnitsAreInterchangeableChange"
>;

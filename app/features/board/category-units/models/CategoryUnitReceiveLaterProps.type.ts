import type { CategoryUnitReceiveViewModel } from "./CategoryUnitReceiveViewModel.interface";

export interface CategoryUnitReceiveLaterProps {
  receive: Pick<
    CategoryUnitReceiveViewModel,
    "canSaveLater" | "handleSaveLater" | "hasDamage"
  >;
}

import type { ExtraFormViewModel } from "./ExtraFormViewModel.interface";

export type ExtraOccupancySectionProps = Pick<
  ExtraFormViewModel,
  | "values"
  | "errors"
  | "isOccupancyEnabled"
  | "isOccupancyDisabled"
  | "isOccupancyLocked"
  | "hasOccupiableCategories"
  | "occupancyCategoryOptions"
  | "onOccupancyToggle"
  | "onOccupiesCategoryChange"
  | "onOccupiesQuantityChange"
>;

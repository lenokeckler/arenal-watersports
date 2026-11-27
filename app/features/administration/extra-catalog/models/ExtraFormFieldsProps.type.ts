import type { ExtraFormViewModel } from "./ExtraFormViewModel.interface";

export type ExtraFormFieldsProps = Pick<
  ExtraFormViewModel,
  | "values"
  | "errors"
  | "isSubmitting"
  | "isOccupancyEnabled"
  | "isOccupancyDisabled"
  | "isOccupancyLocked"
  | "hasOccupiableCategories"
  | "occupancyCategoryOptions"
  | "compatibilityHref"
  | "onNameChange"
  | "onPriceUsdChange"
  | "onPriceCrcChange"
  | "onOccupancySelect"
  | "onOccupiesQuantityStep"
  | "onOccupiesCategoryChange"
  | "onOccupiesQuantityChange"
>;
